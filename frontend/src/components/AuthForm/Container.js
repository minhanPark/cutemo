import React, { useEffect } from "react";
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
      if (password !== passwordConfirm) {
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
    />
  );
};

export default withRouter(Container);
