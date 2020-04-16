import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Presenter from "./Presenter";
import { logout } from "../../modules/user";

const Container = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Presenter user={user} onLogout={onLogout} />;
};

export default Container;
