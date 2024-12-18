import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { ProfilePage } from "../pages/ProfilePage";
import { path } from "../utils/const/path";

export const routes = {
  [path.MAIN]: MainPage,
  [path.PROFILE]: ProfilePage,
  [path.LOGIN]: LoginPage,
  [path.ERROR]: ErrorPage,
};
