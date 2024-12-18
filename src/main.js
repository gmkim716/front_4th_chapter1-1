import { ErrorPage } from "./page/ErrorPage";
import { LoginPage } from "./page/LoginPage";
import { MainPage } from "./page/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

document.getElementById("root").innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
