// document.body.innerHTML = `
//   ${MainPage()}
//   ${ProfilePage()}
//   ${LoginPage()}
//   ${ErrorPage()}
// `;

// 라우팅 함수
import { MainPage } from "./pages/MainPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ErrorPage } from "./pages/ErrorPage.js";

// 사용자의 로그인 상태를 확인하는 함수
const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const renderPage = () => {
  const path = window.location.pathname;

  // 현재 URL 경로에 따라 적절한 페이지를 렌더링한다
  let pageContent;
  switch (path) {
    case "/":
      pageContent = MainPage();
      break;
    case "/profile":
      if (!isAuthenticated()) {
        window.history.replaceState({}, "", "/login");
        pageContent = LoginPage();
      } else {
        pageContent = ProfilePage();
      }
      break;
    case "/login":
      pageContent = LoginPage();
      break;
    default:
      pageContent = ErrorPage();
      break;
  }

  // HTML에 넣기
  document.body.innerHTML = pageContent;
};

// 초기 페이지 렌더링
renderPage();

// 링크 클릭 이벤트 처리
document.addEventListener("click", (e) => {
  // 클릭된 요소가 앵커 태그(<a>)이고, 현재 도메인 내부의 링크를 가리키는지 여부 확인
  if (
    e.target.tagName === "A" &&
    e.target.href.startsWith(window.location.origin)
  ) {
    // 브라우저의 기본동작을 막습니다
    // 새 페이지로 이동하는 a태그의 동작을 막고, 새로고침을 방지합니다
    e.preventDefault();

    // 클릭된 링크의 경로를 인스턴스로 저장합니다
    const href = e.target.getAttribute("href");

    // 브라우저 주소창 url을 변경하고 브라우저 히스토리에 새 항목을 추가합니다
    // {}: 상태 객체, 필요한 경우에 데이터를 저장하는 공간입니다
    // "": 제목, 대부분의 브라우저에서 무시됩니다
    // href: 새로운 url을 가리킵니다
    window.history.pushState({}, "", href);

    // 변경된 url에 해당하는 페이지를 렌더링합니다
    renderPage();
  }
});

// 브라우저 뒤로가기/앞으로가기 처리
// popstate는 브라우저의 뒤로가기/앞으로가기 버튼을 클릭할 때 발생합니다
// 이벤트가 발생하면 renderPage 함수가 호출됩니다
window.addEventListener("popstate", renderPage);
