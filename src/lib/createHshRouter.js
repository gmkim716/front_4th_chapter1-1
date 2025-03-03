import { createObserver } from "./createObserver.js";

export const createHashRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  // 현재 해시경로를 가져오는 함수: ex) https://example.com#/about -> /about 반환
  const getPath = () => {
    return window.location.hash ? window.location.hash.slice(1) : "/";
  };

  // path에 해당하는 페이지를 routes 객체에서 찾아서 반환
  const getTarget = () => routes[getPath()];

  // URL의 해시 부분을 변경하여 새로운 경로로 이동
  const push = (path) => {
    window.location.hash = path;
  };

  // 해시 변경 이벤트 리스너
  // hashchange: url의 해시(#) 부분이 변경될 때마다 발생하는 이벤트, ex) #/about -> #/contact 이동하는 경우
  window.addEventListener("hashchange", notify);

  // 초기 로드 시 해시가 없는 경우를 처리
  window.addEventListener("load", () => {
    // 해시가 없는지 확인
    if (!window.location.hash) {
      push(); // 이때 기본경로("/") 이동으로 처리
    }
  });

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};
