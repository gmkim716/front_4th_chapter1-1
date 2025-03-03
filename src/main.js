import { globalStore } from "../stores/index.js";
import { render } from "./render.js";
import { router } from "../router.js";
import { createRouter } from "./lib/index.js";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { LoginPage, ProfilePage } from "./pages/index.js";
import { HomePage } from "./pages/HomePage.js";

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
  router.get().subscribe(render);
  globalStore.subscribe(render);
  render();
}

main();
