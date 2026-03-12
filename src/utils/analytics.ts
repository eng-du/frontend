import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

const sessionReplay = sessionReplayPlugin({
  sampleRate: 1.0,
});

export const startRecording = () => {
  amplitude.add(sessionReplay);
};

export const stopRecording = () => {
  amplitude.remove(sessionReplay.name!);
};

export type EventMap = {
  engdu_modal_open: { entry_point: string };
  engdu_create_click: { engdu_type: string; topic_length: number };
  wait_modal_view: { engdu_id?: number };
  phrasal_verb_view: { verb_en: string; verb_index: number };
  phrasal_verb_reveal_translation: { verb_en: string };
  phrasal_verb_click_next: { verb_en: string; stay_duration_sec: number };
  initial_generate_success: {
    wait_duration_sec: number;
    viewed_verb_count?: number;
    engdu_id?: number;
  };
  learning_start_click: { wait_after_ready_sec: number };
  quiz_submit_answer: {
    quiz_index: number;
    is_correct: boolean;
    is_complete_ready: boolean;
    solving_duration_sec?: number;
    engdu_id?: number;
  };
  complete_generate_success: {
    arrival_at_quiz_index: number;
    total_gen_duration_sec: number;
    engdu_id?: number;
  };
  engdu_learning_complete: {
    total_learning_duration_min: number;
    average_correct_rate?: number;
    engdu_id?: number;
  };
};

export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY) {
    console.warn('Amplitude API Key is missing. Analytics will not be sent.');
    return;
  }
  amplitude.init(AMPLITUDE_API_KEY, undefined, {
    defaultTracking: {
      sessions: true,
    },
    minIdLength: 1,
    logLevel: import.meta.env.PROD ? amplitude.Types.LogLevel.None : amplitude.Types.LogLevel.Debug,
  });
};

export const trackEvent = <K extends keyof EventMap>(
  eventName: K,
  eventProperties: EventMap[K],
) => {
  amplitude.track(eventName, eventProperties);
};

export const setUserId = (userId: string | number) => {
  amplitude.setUserId(userId.toString());
};
