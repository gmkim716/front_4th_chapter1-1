# 주요 내용 정리

## SPA에서의 페이지 이동 구현

- main.js에서 링크 클릭 이벤트 처리 
- 브라우저 뒤록가기/앞으로가기 처리 

SPA에서 페이지 이동을 구현하는 핵심 내용입니다. 멀티페이지 웹 사이트처럼 동작하면서도, 페이지 이동 시 빠른 응답과 부드러운 전환(새로고침x)이 가능합니다.

1. 새로고침 없는 페이지 이동
2. 브라우저 히스토리 관리
3. URL 동기화 

## History API와 페이지 이동방식

### replaceState vs pushState

1. window.history.replaceState() 
   - 현재 히스토리 항목을 새로운 항목으로 '교체'합니다
   - 뒤로가기 버튼을 누르면 교체되기 전의 페이지로 이동합니다
   - 현재 url을 다른 url로 변경하지만, 새로운 히스토리 항목을 추가하지 않습니다

2. window.history.pushState()
  - 새로운 히스토리 항목을 '추가'합니다
  - 뒤로가기 버턴을 누르면 현재 페이지 이전의 페이지로 이동합니다

### replaceState를 사용하는 경우

1. 리다이렉션: 사용자가 접근할 수 없는 페이지에 접근했을 때, 다른 페이지로 리다이렉션 시킵니다
2. URL 정리: 검색이나 필터링 후 URL 파라미터를 정리할 때
3. 상태 유지: 사용자 액션이 히스토리에 기록되지 않도록 하고 싶을 때 

#### cf. 두 방식 구분의 의의는?

가장 큰 차이점은 브라우저의 히스토리 스택에 어떻게 영향을 미치는가!
- pushState: 히스토리 스택에 쌓아간다: ??? -> /home -> /products -(뒤로가기)-> /home
- replaceState: 현재 히스토리 항목을 교체한다(스택의 최상위 항목을 변경한다): ??? -> /home -> /products -(뒤로가기)-> ???: /home이 스택에 남지않고 교체되었기 때문 

실제 사용에서의 의의
- pushState: 사용자의 탐색 경로를 유지하기 원하는 경우(일반적인 네비게이션의 역할)
- replaceState: 특정 상태를 히스토리에 남기지 을 때(리다이렉션, 불필요한 중간 상태)

ex) 인증이 필요한 페이지로 접근했을 때 로그인 페이지로 리다이렉션하는 경우 pushState가 아닌 replaceState를 사용하는 것이 적절합니다


### SPA에서의 페이지 이동

1. History API 사용 (pushState / replaceState)
  - 페이지를 다시 로드하지 않고 URL만 변경합니다
  - 브라우저 히스토리를 조작해서 뒤로가기/앞으로가기를 지원합니다

2. 해시 기반 라우팅 (#)
   - URL의 해시 부분을 사용해서 라우팅합니다
   - 오래된 브라우저 지원에 유리합니다

#### cf. 오래된 브라우저 지원 유리?

해시기반 라우팅은 IE9 이전 버전에서도 작동합니다. History API는 IE10 이상의 현대적인 브라우저에서 지원되는 형식입니다.
현대 웹 개발에서는 대부분 HistoryAPI 방식을 선호하며, 해시기반 라우팅보다 깔끔한 URL을 제공하고 더 나은 SEO를 제공하는 특징이 있습니다

결론적으로, 특별한 이유가 없다면 History API 방식으로 개발을 진행하면 됩니다.


## Errors

### React 구현 방식을 따라 아래처럼 진행하면 동작하지 않음

- 페이지가 다시 렌더링될 때마다 동한 선택자에 이벤트 리스너가 중복해서 추가됩니다: 렌더링이 이어질 때마다 이벤트 핸들러가 누적해서 실행
- 게시물이 중복 등록되거나 여러 번 등록되는 버그로 이어질 수 있습니다

#### AS-IS
```js
export const MainPage = () => {
   const { loggedIn, posts } = globalStore.getState();

   // 글 추가 함수 정의
   const addPost = (content) => {
      const { currentUser, posts } = globalStore.getState();
      globalStore.setState({
         posts: [
            ...posts,
            {
               id: Date.now(),
               author: currentUser.name,
               time: "방금 전",
               content: content,
            },
         ],
      });
   };

   // 글로벌 이벤트 리스너 등록
   addEvent("click", "#post-submit", () => {
      const content = document.getElementById("post-content").value;
      addPost(content);
   });

   return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ loggedIn })}
        
        <main class="p-4">
          ${loggedIn ? PostForm() : ""}
          <div id="posts-container" class="space-y-4">
            ${posts.map(Post).join("")}
          </div>
        
        ${Footer()}
      </div>
    </div>
  `;
};
```

#### TO-BE
```js
export const MainPage = () => {
   const { loggedIn, posts } = globalStore.getState();

   return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ loggedIn })}
        
        <main class="p-4">
          ${loggedIn ? PostForm() : ""}
          <div id="posts-container" class="space-y-4">
            ${posts.map(Post).join("")}
          </div>
        
        ${Footer()}
      </div>
    </div>
  `;
};

// 글 추가 함수 정의
const addPost = (content) => {
   const { currentUser, posts } = globalStore.getState();
   globalStore.setState({
      posts: [
         ...posts,
         {
            id: Date.now(),
            author: currentUser.name,
            time: "방금 전",
            content: content,
         },
      ],
   });
};

// 글로벌 이벤트 리스너 등록
addEvent("click", "#post-submit", () => {
   const content = document.getElementById("post-content").value;
   addPost(content);
});
```