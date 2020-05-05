import React from "react";
import TextForm from "../components/TextForm";
import WriteActionButtons from "../components/WriteActionButtons";
import { Helmet } from "react-helmet-async";

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title>메모 작성 - CUTEMO</title>
      </Helmet>
      <TextForm />
      <WriteActionButtons />
    </>
  );
};

export default WritePage;
