import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const AuthBackground = styled.div`
  background-color: ${palette.gray[2]};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteWrapper = styled.div`
  background-color: white;
  position: relative;
  width: 35%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  @media screen and (max-width: 400px) {
    width: 85%;
  }
  @media screen and (max-width: 780px) {
    width: 60%;
  }
`;

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .logo-wrapper {
    font-weight: bold;
    font-size: 2.5rem;
    text-align: center;
    padding: 15px 0;
    @media screen and (max-width: 400px) {
      font-size: 1.9rem;
    }
    @media screen and (max-width: 780px) {
      font-size: 2.3rem;
    }
  }
`;

const Presenter = ({ children }) => {
  return (
    <AuthBackground>
      <WhiteWrapper>
        <InnerWrapper>
          <div className="logo-wrapper">
            <Link to="/">CUTEMO</Link>
          </div>
          {children}
        </InnerWrapper>
      </WhiteWrapper>
    </AuthBackground>
  );
};

export default Presenter;
