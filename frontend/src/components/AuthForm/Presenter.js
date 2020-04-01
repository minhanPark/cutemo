import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../ButtonComponent";
import { Link } from "react-router-dom";

const FormHeader = styled.h2`
  padding: 8px 12px;
  font-size: 32px;
  margin: 14px 0;
`;

const StyledForm = styled.form`
  width: 95%;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  outline: none;
  font-size: 1.2rem;
  & + & {
    margin-top: 1rem;
  }
`;
// 버튼위에 marinTop을 주도록 여기서 변형시킨다.
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`;

const Footer = styled.div`
  margin: 1.5rem;
  text-align: end;
  & a:hover {
    color: ${palette.green[3]};
  }
`;

const Presenter = () => {
  return (
    <div>
      <FormHeader>로그인</FormHeader>
      <StyledForm>
        <StyledInput placeholder="아이디" />
        <StyledInput placeholder="비밀번호" />
        <ButtonWithMarginTop fullWith green>
          로그인
        </ButtonWithMarginTop>
      </StyledForm>
      <Footer>
        <Link to="/register">회원가입</Link>
      </Footer>
    </div>
  );
};

export default Presenter;
