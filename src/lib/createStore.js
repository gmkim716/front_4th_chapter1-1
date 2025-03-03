import { createObserver } from "./createObserver.js";

export const createStore = (initialStore) => {
  const { subscribe, notify } = createObserver();

  // 초기 상태의 복사본 생성
  let state = { ...initialStore };

  const setState = (newState) => {
    // 기존 상태와 새 상태를 병합: 동일한 키를 가진 속성은 새 상태의 값이 기존 상태의 값을 덮어씁니다, 변경된 부분만 업데이트 되는 '얕은 병합'이 적용됩니다
    // todo: 얕은 병합 vs 깊은 병합 구분하기
    state = { ...state, ...newState };
    notify(); // 모든 구독자에게 상태 변화를 알림
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};
