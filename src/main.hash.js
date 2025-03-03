import "./main.js";
import { router } from "./router.js";
import { createHashRouter } from "./lib/createHashRouter.js";
import { HomePage } from "./pages/HomePage.js";
import { globalStore } from "../stores/index.js";
import { ForbiddenError, UnauthorizedError } from "./errors/index.js";
import { LoginPage, ProfilePage } from "./pages/index.js";
import { render } from "./render.js";

router.set(
  createHashRouter({
    "/": HomePage,
    "/login": () => {
      const { loggedIn } = globalStore.getState();
      if (loggedIn) {
        throw new ForbiddenError();
      }
      return LoginPage();
    },
    "/profile": () => {
      const { loggedIn } = globalStore.getState();
      if (!loggedIn) {
        throw new UnauthorizedError();
      }
      return ProfilePage();
    },
  }),
);

function main() {
  router.get().subscribe(render);
  globalStore.subscribe(render);

  render();
}

main();
