import { createObserver } from "./createObserver.js";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  // 브라우저에서 현재 경로를 획득
  const getPath = () => window.location.pathname;

  // 현재 경로에 해당하는 페이지를 획득
  const getTarget = () => routes[getPath()];

  // history API를 이용해 페이지 이동: pushState를 사용해 페이지 새로고침이 발생하지 않음
  const push = (path) => {
    window.history.pushState(null, null, path);

    // Q: 왜 필요할까?
    // A: SPA는 URL이 변경되어도 자동으로 페이지를 업데이트하지 않음, notify를 동작시키지 않으면 URL은 변경되지만 화면이 업데이트 되지 않는다
    notify();
  };

  // 브라우저 앞으로/뒤로가기 이동
  window.addEventListener("popstate", () => notify());

  return {
    // todo: 형태가 생소함
    get path() {
      return getPath();
    },
    push,
    subscribe,
    notify,
    getTarget,
  };
};
