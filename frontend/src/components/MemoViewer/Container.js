import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readMemo, unloadMemo } from "../../modules/memo";
import Presenter from "./Presenter";

const Container = ({ match }) => {
  const { memoId: id } = match.params;
  console.log("memoId is", id);
  const dispatch = useDispatch();
  const { memo, error, loading } = useSelector(({ loading, memo }) => ({
    memo: memo.memo,
    error: memo.error,
    loading: loading["memo/READ_MEMO"],
  }));

  useEffect(() => {
    dispatch(readMemo({ id }));
    return () => {
      dispatch(unloadMemo());
    };
  }, [dispatch, id]);
  return <Presenter memo={memo} loading={loading} error={error} />;
};

export default withRouter(Container);
