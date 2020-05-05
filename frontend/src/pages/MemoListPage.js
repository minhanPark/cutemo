import React from "react";
import Header from "../components/Header";
import MemoList from "../components/MemoList";
import Pagination from "../components/Pagination";

const MemoListPage = () => {
  return (
    <>
      <Header />
      <MemoList />
      <Pagination />
    </>
  );
};

export default MemoListPage;
