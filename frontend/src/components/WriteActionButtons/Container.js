import React, { useEffect } from "react";
import Presenter from "./Presenter";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writeMemo } from "../../modules/write";

const Container = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, memo, memoError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    memo: write.memo,
    memoError: write.memoError,
  }));

  const onPublish = () => {
    dispatch(writeMemo({ title, body }));
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (memo) {
      const { _id, user } = memo;
      history.push(`/@${user.username}/${_id}`);
    }
    if (memoError) {
      console.log(memoError);
    }
  }, [history, memo, memoError]);
  return <Presenter onPublish={onPublish} onCancel={onCancel} />;
};

export default withRouter(Container);
