/**
 * 이벤트 위임 패턴을 구현한 이벤트 관리 시스템
 */

// 모든 이벤트 핸들러를 저장하는 객체
const eventHandlers = {};

// 이벤트가 발생하면, 이벤트 타입의 핸들러 객체를 가져옵니다
const handleGlobalEvents = (e) => {
  // Q: e.type? A: 발생한 이벤트의 유형, click, keydown, submit 등
  const handlers = eventHandlers[e.type];
  if (!handlers) return; // 이벤트 타입에 해당하는 핸들러가 없으면 종료

  // 이벤트가 발생한 타겟의 셀렉터를 키로 가지는 핸들러를 찾아 실행
  // Q: for문을 통해 탐색하면서 break를 통해 하나만 실행하도 중단하는 이유
  // A: 하나의 요소가 여러 선택자와 일치할 수 있기 때문에, 중복 실행을 방지하기 위함
  for (const selector in handlers) {
    if (e.target.matches(selector)) {
      handlers[selector](e);
      break;
    }
  }
};

// 클로저를 생성해 전역 이벤트 리스너를 등록
// 목적: 수 백개의 요소에 개별적으로 이벤트 리스너를 추가하는 대신, document.body 하나에만 이벤트 리스너를 추가하기 위함. 메모리 사용량을 크게 줄이고 성능을 향상시킬 수 있습니다
// 애플리케이션 시작 지점에서 한 번만 호출하면 이후에는 addEvent 함수를 통해 이벤트 핸들러를 등록할 수 있습니다
export const registerGlobalEvents = (() => {
  let init = false; // 클로저 내부에 캡슐화된 상태
  return () => {
    if (init) return;

    // eventHandlers에 등록된 모든 이벤트 타입을 가져와서, 전역 이벤트 리스너로 등록
    Object.keys(eventHandlers).forEach((eventType) => {
      document.body.addEventListener(eventType, handleGlobalEvents);
    });

    init = true;
  };
})();

// 새로운 이벤트 핸들러를 등록
export const addEvent = (eventType, selector, handler) => {
  // 지정된 이벤트 타입에 대한 핸들러 맵이 없으면 새로 생성
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }

  // 동일한 이벤트 타입과 선택자에 대해 다시 등록하면, 이전 핸들러를 덮어씁니다
  eventHandlers[eventType][selector] = handler;
};
