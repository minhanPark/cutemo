import React, { useEffect } from "react";
import Presenter from "./Presenter";
import { useDispatch, useSelector } from "react-redux";
import { readLists } from "../../modules/memos";
import { withRouter } from "react-router-dom";
import qs from "qs";

const Container = ({ location }) => {
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
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(readLists({ page }));
  }, [dispatch, location.search]);
  return (
    <Presenter
      loading={loading}
      error={error}
      memos={memos}
      showWriteBtn={user}
    />
  );
};

export default withRouter(Container);
