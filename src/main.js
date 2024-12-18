import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

export const Router = (function () {
  const routes = {};

  function addRoute(path, component) {
    routes[path] = component;
  }

  function navigate(path) {
    if (path === "/login" && isLoggedIn()) {
      window.history.replaceState({}, "", "/");
      render("/");
      return;
    }

    if (!routes[path]) {
      path = "/404";
    }

    window.history.pushState({}, "", path); // history API: 새로고침 없이 주소만 변경이 가능하다
    render(path); // 컴포넌트 렌더링
  }

  // render: 주어진 경로에 맞는 컴포넌트를 렌더링하는 역할, cf. popState와는 다르다
  function render(path) {
    const appElement = document.getElementById("root");
    if (!appElement) {
      console.error("app 요소를 찾을 수 없습니다.");
      return;
    }
    const component = routes[path] || routes["/404"]; // 경로를 찾지 못하면 404
    appElement.innerHTML = component();
  }

  // popState: 뒤로가기, 앞으로가기 버튼을 눌렀을 때 발생하는 이벤트
  // 사용자가 url을 변경했을 때 이벤트가 발생
  function handlePopState() {
    const currentPath = window.location.pathname;

    // 로그인된 사용자의 접근 제어
    if (currentPath === "/profile" && !isLoggedIn()) {
      window.history.replaceState({}, "", "/login");
      render("/login");
      return;
    }

    // 로그인된 사용자가 /login 페이지에 접근하려고 하면 메인 페이지로 리디렉트
    if (currentPath === "/login" && isLoggedIn()) {
      window.history.replaceState({}, "", "/");
      render("/");
    }

    render(currentPath);
  }

  function init() {
    window.addEventListener("popstate", handlePopState); // 뒤로가기, 앞으로가기 버튼을 눌렀을 때 발생하는 이벤트
    document.addEventListener("click", (e) => {
      const target = e.target.closest("a.nav-link");
      if (target) {
        e.preventDefault();
        const path = target.getAttribute("href");
        navigate(path);
      }
    });
    navigate(window.location.pathname);
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();

function isLoggedIn() {
  return localStorage.getItem("user");
}

Router.addRoute("/", MainPage);
Router.addRoute("/profile", ProfilePage);
Router.addRoute("/login", LoginPage);
Router.addRoute("/404", ErrorPage);

Router.init();
