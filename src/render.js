import { router } from "./router.js";
import { registerGlobalEvents } from "../utils/index.js";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { NotFoundPage } from "./pages/index.js";

// SPA의 원리인 id=root인 태그에 렌더링된 HTML을 삽입하는 함수
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
