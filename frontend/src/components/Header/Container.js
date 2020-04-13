import React from "react";
import { useSelector } from "react-redux";
import Presenter from "./Presenter";

const Container = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return <Presenter user={user} />;
};

export default Container;
