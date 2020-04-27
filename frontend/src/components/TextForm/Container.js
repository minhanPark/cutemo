import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "../../modules/write";
import Presenter from "./Presenter";

const Container = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChange = useCallback((payload) => dispatch(changeField(payload)), [
    dispatch,
  ]);
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Presenter onChange={onChange} title={title} body={body} />;
};

export default Container;
