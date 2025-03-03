import { renderPage } from "../main.js";

export const Navigation = () => {
  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem("user") !== null;

  const setupLogoutEvent = () => {
    const logoutLink = document.getElementById("logout-nav");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault(); // 링크의 기본 동작 방지
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        renderPage(); // 페이지 리로드
      });
    }
  };

  // 이벤트 리스너 설정 (HTML이 렌더링된 후)
  setTimeout(setupLogoutEvent, 0);

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600">홈</a></li>
         ${
           isLoggedIn
             ? `<li><a href="/profile" class="text-gray-600">프로필</a></li>
                <li><a href="#" id="logout-nav" class="text-gray-600">로그아웃</a></li>`
             : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
         }
      </ul>
    </nav>
  `;
};
