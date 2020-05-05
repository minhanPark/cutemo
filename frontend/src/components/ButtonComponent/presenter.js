import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${(props) =>
    props.fullWith &&
    css`
      width: 100%;
      font-size: 1.125rem;
      padding: 0.45rem;
    `};

  ${(props) =>
    props.green &&
    css`
      background-color: ${palette.green[2]};
      &:hover {
        background-color: ${palette.green[3]};
      }
    `}
  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} green={props.green ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
