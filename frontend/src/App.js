import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MemoListPage from "./pages/MemoListPage";
import MemoPage from "./pages/MemoPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <>
      <Route component={MemoListPage} path="/" exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={MemoPage} path="/@:username/:memoId" />
    </>
  );
}

export default App;
