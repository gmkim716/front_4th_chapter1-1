import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { PATH } from "../utils/const/path.js";
import { UserStore } from "../store/useStore.js";
import { Component } from "../lib/component.js";

class ProfilePage extends Component {
  constructor(template) {
    super();

    this.template = template;
  }

  render() {
    if (!new UserStore().getState()) {
      this.router.navigate(PATH.LOGIN);
      return;
    }

    document.getElementById("root").innerHTML = this.template();

    this.editEventListeners();
    this.updateProfileTemplate();
    this.logoutEventListener();
  }

  editEventListeners() {
    document.getElementById("profile-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      new UserStore().setState({ username, email, bio });
      this.updateProfileTemplate();
    });
  }

  updateProfileTemplate() {
    const { username, email, bio } = new UserStore().getState();

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
  }

  logoutEventListener() {
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      new UserStore().removeUser();
      this.router.navigate(PATH.LOGIN);
    });
  }
}

const ProfileTemplate = () => `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600">홈</a></li>
            <li><a href="/profile" class="text-blue-600 font-bold">프로필</a></li>
            <li><button id="logout" class="text-gray-600">로그아웃</button></li>
          </ul>
        </nav>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="홍길동"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="hong@example.com"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                  >
                  ${new UserStore().getState().bio}</textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
`;

export const profilePage = new ProfilePage(ProfileTemplate);
