import React, { useEffect } from "react";
import Presenter from "./Presenter";
import { useDispatch, useSelector } from "react-redux";
import { readLists } from "../../modules/memos";

const Container = () => {
  const dispatch = useDispatch();
  const { memos, error, loading, user } = useSelector(
    ({ memos, loading, user }) => ({
      memos: memos.memos,
      error: memos.error,
      loading: loading["memos/READ_LISTS"],
      user: user.user,
    })
  );
  useEffect(() => {
    dispatch(readLists());
  }, [dispatch]);
  return (
    <Presenter
      loading={loading}
      error={error}
      memos={memos}
      showWriteBtn={user}
    />
  );
};

export default Container;
