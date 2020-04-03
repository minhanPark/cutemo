import React, { useEffect } from "react";
import Presenter from "./Presenter";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";

const Container = ({ type }) => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth[type],
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
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm(type));
  }, [dispatch]);
  return (
    <Presenter
      type={type}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default Container;
