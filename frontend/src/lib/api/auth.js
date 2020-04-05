import client from "./client";

// 로그인
export const login = ({ username, password }) =>
  client.post("/auth/login", { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post("/auth/register", { username, password });
// payload 통해서 들어오는 값을 받기 위해서 이렇게 표시

// 로그인 상태 확인
export const check = () => client.get("/auth/check");
