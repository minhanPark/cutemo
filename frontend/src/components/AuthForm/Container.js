import React, { useEffect, useState } from "react";
import Presenter from "./Presenter";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initializeForm,
  register,
  login,
} from "../../modules/auth";
import { check } from "../../modules/user";
import { withRouter } from "react-router-dom";

const Container = ({ type, history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth[type],
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: type,
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    console.log(type);
    e.preventDefault();
    if (type === "register") {
      const { username, password, passwordConfirm } = form;
      if ([username, password, passwordConfirm].includes("")) {
        setError("빈 칸을 모두 입력하세요.");
        return;
      }
      if (password !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
        changeField({ form: "register", key: "password", value: "" });
        changeField({ form: "register", key: "passwordConfirm", value: "" });
        return;
      }
      dispatch(register({ username, password }));
    } else {
      const { username, password } = form;
      dispatch(login({ username, password }));
    }
  };

  useEffect(() => {
    dispatch(initializeForm(type));
  }, [dispatch, type]);
  useEffect(() => {
    if (authError) {
      console.log("오류발생");
      console.log(authError);
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      setError(`${type === "login" ? "로그인 실패" : "회원가입 실패"}`);
      return;
    }
    if (auth) {
      console.log(`${type === register ? "회원가입 성공" : "로그인 성공"}`);
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch, type]);

  useEffect(() => {
    if (user) {
      console.log("check API 성공");
      console.log(user);
      history.push("/");
    }
  }, [user, history]);
  return (
    <Presenter
      type={type}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(Container);
