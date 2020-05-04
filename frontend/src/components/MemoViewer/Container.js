import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readMemo, unloadMemo } from "../../modules/memo";
import Presenter from "./Presenter";

const Container = () => {
  return <Presenter />;
};

export default Container;
