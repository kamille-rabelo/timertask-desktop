import { sendNotification } from "@tauri-apps/plugin-notification";
import { addSeconds, differenceInMilliseconds } from "date-fns";
import { create } from "zustand";
import { playSound } from "../../../code/utils/audio";

interface CountdownTimerState {
  activityMinutes: number;
  initialMinutes: number;
  restMinutes: number;
  currentTimeInSeconds: number;
  isRunning: boolean;
  totalCycles: number;
  isResting: boolean;
  extraAddedMinutes: number;
  percentageOfRestingTime: number;
}

interface CountdownTimerActions {
  start: () => void;
  stop: () => void;
  reset: () => void;
  goBackToWork: () => void;
  updateActivityMinutes: (activityMinutes: number) => void;
  goToRest: () => void;
  addExtraTime: (minutes: number) => void;
  updatePercentageOfRestingTime: (percentage: number) => void;
}

interface CountdownTimerStore {
  state: CountdownTimerState;
  actions: CountdownTimerActions;
}

const secondsPerMinute = 60;
const millisecondsPerSecond = 1000;
const initialActivityMinutes = 25;
const initialPercentageOfRestingTime = 20;

function getRestMinutes(activityMinutes: number, percentage: number) {
  return activityMinutes * (percentage / 100);
}

const initialRestMinutes = getRestMinutes(initialActivityMinutes, initialPercentageOfRestingTime);

const intervalRef: { current: ReturnType<typeof setInterval> | null } = {
  current: null,
};
const endTimeRef: { current: Date | null } = { current: null };

function playAlertSound() {
  playSound("/car-alarm.mp3").catch(() => {});
  sendNotification({
    title: "Timer Alert",
    body: "Countdown finished.",
  });
}

export const useCountdownTimerState = create<CountdownTimerStore>(
  (set, get) => {
    function setState(partial: Partial<CountdownTimerState>) {
      set((store) => ({
        state: {
          activityMinutes:
            partial.activityMinutes ?? store.state.activityMinutes,
          initialMinutes: partial.initialMinutes ?? store.state.initialMinutes,
          restMinutes: partial.restMinutes ?? store.state.restMinutes,
          currentTimeInSeconds:
            partial.currentTimeInSeconds ?? store.state.currentTimeInSeconds,
          isRunning: partial.isRunning ?? store.state.isRunning,
          totalCycles: partial.totalCycles ?? store.state.totalCycles,
          isResting: partial.isResting ?? store.state.isResting,
          extraAddedMinutes:
            partial.extraAddedMinutes ?? store.state.extraAddedMinutes,
          percentageOfRestingTime:
            partial.percentageOfRestingTime ?? store.state.percentageOfRestingTime,
        },
        actions: store.actions,
      }));
    }

    function start() {
      const store = get();
      if (intervalRef.current) {
        return;
      }
      if (store.state.currentTimeInSeconds <= 0) {
        return;
      }

      endTimeRef.current = addSeconds(
        new Date(),
        store.state.currentTimeInSeconds,
      );

      setState({
        isRunning: true,
      });

      intervalRef.current = setInterval(() => {
        if (!endTimeRef.current) {
          return;
        }

        const millisecondsLeft = differenceInMilliseconds(
          endTimeRef.current,
          new Date(),
        );

        if (millisecondsLeft <= 0) {
          stop();
          playAlertSound();

          setState({
            currentTimeInSeconds: 0,
          });
          return;
        }

        setState({
          currentTimeInSeconds: Math.ceil(
            millisecondsLeft / millisecondsPerSecond,
          ),
        });
      }, millisecondsPerSecond);
    }

    function stop() {
      const store = get();
      if (!store.state.isRunning && !intervalRef.current) {
        return;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      endTimeRef.current = null;

      setState({
        isRunning: false,
      });
    }

    function reset() {
      const store = get();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      endTimeRef.current = null;

      const initialSeconds = store.state.activityMinutes * secondsPerMinute;

      setState({
        initialMinutes: store.state.activityMinutes,
        currentTimeInSeconds: initialSeconds,
        isRunning: false,
        isResting: false,
        extraAddedMinutes: 0,
      });
    }

    function goBackToWork() {
      const store = get();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      endTimeRef.current = null;

      const initialSeconds = store.state.activityMinutes * secondsPerMinute;

      setState({
        initialMinutes: store.state.activityMinutes,
        currentTimeInSeconds: initialSeconds,
        isRunning: false,
        isResting: false,
        extraAddedMinutes: 0,
        totalCycles: store.state.totalCycles + 1,
      });

      start();
    }

    function updateActivityMinutes(activityMinutes: number) {
      const store = get();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      endTimeRef.current = null;

      const restMinutes = getRestMinutes(activityMinutes, store.state.percentageOfRestingTime);
      const initialSeconds = activityMinutes * secondsPerMinute;

      setState({
        activityMinutes,
        restMinutes,
        initialMinutes: activityMinutes,
        currentTimeInSeconds: initialSeconds,
        isRunning: false,
        isResting: false,
        extraAddedMinutes: 0,
      });
    }

    function updatePercentageOfRestingTime(percentage: number) {
      const store = get();

      const restMinutes = getRestMinutes(store.state.activityMinutes, percentage);

      setState({
        percentageOfRestingTime: percentage,
        restMinutes,
      });
    }

    function goToRest() {
      const store = get();
      const percentage = store.state.percentageOfRestingTime;

      const baseRest = getRestMinutes(store.state.activityMinutes, percentage);
      const extraRest = store.state.extraAddedMinutes * (percentage / 100);
      const restMinutes = baseRest + extraRest;

      setState({
        restMinutes,
        initialMinutes: restMinutes,
        currentTimeInSeconds: restMinutes * secondsPerMinute,
        isResting: true,
        extraAddedMinutes: 0,
      });

      start();
    }

    function addExtraTime(minutes: number) {
      const store = get();
      const newExtra = store.state.extraAddedMinutes + minutes;
      const newInitial = store.state.initialMinutes + minutes;
      const newCurrent =
        store.state.currentTimeInSeconds + minutes * secondsPerMinute;

      setState({
        initialMinutes: newInitial,
        currentTimeInSeconds: newCurrent,
        isResting: false,
        extraAddedMinutes: newExtra,
      });

      start();
    }

    return {
      state: {
        activityMinutes: initialActivityMinutes,
        initialMinutes: initialActivityMinutes,
        restMinutes: initialRestMinutes,
        currentTimeInSeconds: initialActivityMinutes * secondsPerMinute,
        isRunning: false,
        totalCycles: 0,
        isResting: false,
        extraAddedMinutes: 0,
        percentageOfRestingTime: initialPercentageOfRestingTime,
      },
      actions: {
        start,
        stop,
        reset,
        goBackToWork,
        updateActivityMinutes,
        goToRest,
        addExtraTime,
        updatePercentageOfRestingTime,
      },
    };
  },
);
