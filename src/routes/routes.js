import { PATH } from "../utils/const/path.js";
import { mainPage } from "../pages/MainPage.js";
import { profilePage } from "../pages/ProfilePage.js";
import { loginPage } from "../pages/LoginPage.js";
import { notFoundPage } from "../pages/NotFoundPage.js";

export const routes = {
  [PATH.MAIN]: mainPage,
  [PATH.PROFILE]: profilePage,
  [PATH.LOGIN]: loginPage,
  [PATH.NOT_FOUND]: notFoundPage,
};
