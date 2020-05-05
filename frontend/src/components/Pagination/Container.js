import React from "react";
import Presenter from "./Presenter";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "qs";

const Container = ({ location }) => {
  console.log("location is", location);
  const { memos, loading } = useSelector(({ memos, loading }) => ({
    memos: memos.memos,
    loading: loading["memos/READ_LISTS"],
  }));

  const [cookies] = useCookies(["Last-Page"]);
  // cookies는 {Last-Page: "2"}
  const lastPage = cookies["Last-Page"];
  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (!memos || loading) return null;
  return (
    <Presenter lastPage={parseInt(lastPage, 10)} page={parseInt(page, 10)} />
  );
};

export default withRouter(Container);
