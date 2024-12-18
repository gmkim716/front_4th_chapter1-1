export class CreateRouter {
  constructor(routes, { mode = "history" }) {
    this.routes = routes;
    this.isHistory = mode === "history";

    Object.values(routes).forEach((route) => route.setRouter(this));
  }

  init() {
    this.linkEventListeners();
    if (this.isHistory) {
      this.popstateListener();
      this.navigate(window.location.pathname);
    } else {
      this.hashchangeListener();
      this.navigate(window.location.hash);
    }
  }

  navigate(currentPath) {
    const validatePath = this.isHistory
      ? currentPath
      : currentPath.replace("#", "");
    const template = this.routes[validatePath] || this.routes.error;

    if (this.isHistory) {
      this.pushHistoryState(validatePath);
    } else {
      this.hashState(validatePath);
    }

    return template.render();
  }

  linkEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        const path = e.target.getAttribute("href");

        if (path === "#") return;

        if (this.isHistory) {
          this.pushHistoryState(path);
        } else {
          this.hashState(path);
        }
        this.navigate(path);
      }
    });
  }

  popstateListener() {
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  hashchangeListener() {
    window.addEventListener("hashchange", () => {
      this.navigate(window.location.hash);
    });
  }

  pushHistoryState(path) {
    window.history.pushState({}, path, window.location.origin + path);
  }

  hashState(path) {
    window.location.hash = path;
  }
}
