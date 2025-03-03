/**
 * 라우터 객체를 정의
 * 전역에서 접근 간으한 라우터 인스턴스를 제공
 */
export const router = {
  value: null,
  get() {
    return this.value;
  },
  set(newValue) {
    this.value = newValue;
  },
};
