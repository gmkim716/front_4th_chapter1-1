import { createStorage } from "../src/lib/index.js";

// createStorage의 기본값이 localStorage를 사용함, "user"를 key로 하는 저장공간을 사용
export const userStorage = createStorage("user");
