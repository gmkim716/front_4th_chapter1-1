import { router } from "../router.js";
import { registerGlobalEvents } from "../utils/index.js";
import { ForbiddenError } from "./errors/ForbiddenError.js";
import { UnauthorizedError } from "./errors/UnauthorizedError.js";
import { NotFoundPage } from "./pages/index.js";

export const render = () => {
  const $root = document.querySelector("#root");

  try {
    const Page = router.get().getTarget() ?? NotFoundPage;

    $root.innerHTML = Page();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.get().push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.get().push("/login");
      return;
    }
    console.error(error);
  }

  registerGlobalEvents();
};
