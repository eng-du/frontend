const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;
const REPLAY_SAMPLE_RATE = 0.1;

let amplitudeModule: typeof import('@amplitude/analytics-browser') | null = null;
let isInitializing = false;
let sessionReplayPluginInstance: any = null;

async function loadAmplitude() {
  if (amplitudeModule) return amplitudeModule;
  amplitudeModule = await import('@amplitude/analytics-browser');
  return amplitudeModule;
}

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

/**
 * 1. Analytics 초기화 (Idle 시점에 로드)
 */
export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY || isInitializing || amplitudeModule) return;
  isInitializing = true;

  const initialize = async () => {
    try {
      const amp = await loadAmplitude();
      amp.init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: {
          sessions: true,
        },
        minIdLength: 1,
        logLevel: import.meta.env.PROD ? 0 : 3, // None : Debug
      });
    } catch (error) {
      console.error('Failed to initialize Amplitude:', error);
    } finally {
      isInitializing = false;
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => initialize(), { timeout: 5000 });
  } else {
    setTimeout(initialize, 3000);
  }
};

/**
 * 2. Session Replay 시작 (실제 호출 시점에만 SDK 로드)
 */
export const startRecording = async () => {
  try {
    const amp = await loadAmplitude();
    
    if (!sessionReplayPluginInstance) {
      // Replay 플러그인과 그 의존성(rrweb 등)을 이 시점에만 로드
      const { sessionReplayPlugin } = await import('@amplitude/plugin-session-replay-browser');
      sessionReplayPluginInstance = sessionReplayPlugin({
        sampleRate: REPLAY_SAMPLE_RATE,
      });
      amp.add(sessionReplayPluginInstance);
    }
  } catch (error) {
    console.error('Failed to start Session Replay:', error);
  }
};

export const stopRecording = async () => {
  if (amplitudeModule && sessionReplayPluginInstance) {
    amplitudeModule.remove(sessionReplayPluginInstance.name);
  }
};

/**
 * 3. 이벤트 트래킹 (초기화 전 호출 시 자동 로드)
 */
export const trackEvent = async <K extends keyof EventMap>(
  eventName: K,
  eventProperties: EventMap[K],
) => {
  try {
    const amp = await loadAmplitude();
    amp.track(eventName, eventProperties);
  } catch (error) {
    // 분석 도구 오류가 앱 로직에 영향을 주지 않도록 swallow
  }
};

export const setUserId = async (userId: string | number) => {
  try {
    const amp = await loadAmplitude();
    amp.setUserId(userId.toString());
  } catch (error) {}
};
