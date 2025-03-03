import { globalStore } from "../../../stores/index.js";
import { userStorage } from "../../../storages/index.js";
import { addEvent } from "../../../utils/index.js";
import { router } from "../../router.js";

const getNavItemClass = (path) => {
  const currentPath = router.get().path;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

const Navigation = ({ loggedIn }) => {
  if (!loggedIn) {
    return `<li><a href="/login" class="${getNavItemClass("/login")}" data-link>로그인</a></li>`;
  }

  return `
    <li><a href="/profile" class="${getNavItemClass("/profile")}" data-link>프로필</a></li>
    <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
  `;
};

export const Header = ({ loggedIn }) => {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${getNavItemClass("/")}" data-link>홈</a></li>
        ${Navigation({ loggedIn })}
      </ul>
    </nav>
  `;
};

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.get().push("/login");
  userStorage.reset();
}

addEvent("click", "#logout", (e) => {
  e.preventDefault();
  logout();
});
