import React from "react";
import AuthTemplate from "../components/AuthTemplate";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register" />
    </AuthTemplate>
  );
};

export default RegisterPage;
