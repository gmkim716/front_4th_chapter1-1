/**
 * 옵저버 패턴을 구현: 객체의 상태 변화를 관찰하는 객체에게 알림을 보내는 디자인 패턴
 */
export const createObserver = () => {
  // Set 객체를 사용해서 상태 변화를 구독하는 함수들을 저장: Set을 사용하면 중복 구독을 방지 가능
  const listeners = new Set();

  // 새로운 구독 객체를 등록
  const subscribe = (fn) => listeners.add(fn);

  // 리스너에게 알림을 전송
  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
