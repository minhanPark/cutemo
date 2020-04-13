import React from "react";
import styled from "styled-components";
import Button from "../ButtonComponent";
import { Link } from "react-router-dom";

const HeaderResponsive = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  position: fixed;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Space = styled.div`
  height: 4rem;
`;

const Presenter = () => {
  return (
    <>
      <HeaderResponsive>
        <Wrapper>
          <Link to="/" className="logo">
            Cutemo
          </Link>
          <div className="buttons">
            <Button to="/login">로그인</Button>
          </div>
        </Wrapper>
      </HeaderResponsive>
      <Space />
    </>
  );
};

export default Presenter;
