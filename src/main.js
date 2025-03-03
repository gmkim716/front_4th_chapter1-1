import { globalStore } from "../stores/index.js";
import { render } from "./render.js";
import { router } from "../router.js";
import { createRouter } from "./lib/index.js";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { LoginPage, ProfilePage } from "./pages/index.js";
import { HomePage } from "./pages/HomePage.js";

// 로그인 여부에 따라 페이지 접근 권한을 제어하는 함수
const AuthGuard = (validation, CustomError, Component) => {
  return () => {
    const { loggedIn } = globalStore.getState();
    if (validation(loggedIn)) {
      throw new CustomError();
    }
    return Component();
  };
};

router.set(
  createRouter({
    "/": HomePage,
    "/login": AuthGuard(Boolean, ForbiddenError, LoginPage),
    "/profile": AuthGuard((value) => !value, UnauthorizedError, ProfilePage),
  }),
);

function main() {
  router.get().subscribe(render); // 라우터의 상태가 변경되면 render 함수를 호출
  globalStore.subscribe(render); // 전역상태가 변경되면 render 함수를 호출
  render();
}

main();
