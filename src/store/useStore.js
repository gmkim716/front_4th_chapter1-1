import { CreateStore } from "../lib/createStore";

export class UserStore extends CreateStore {
  constructor() {
    const userInfo = JSON.parse(localStorage.getItem("user")) || null;
    super(userInfo);

    if (UserStore.instance) {
      return UserStore.instance;
    }
    UserStore.instance = this;
  }

  setState(newState) {
    this.state = newState;
    localStorage.setItem("user", JSON.stringify(newState));
  }

  getState() {
    return super.getState();
  }

  removeUser() {
    this.state = null;
    localStorage.removeItem("user");
  }
}
