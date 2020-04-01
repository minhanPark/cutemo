import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const StyledButton = styled.button`
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
  ${props =>
    props.fullWith &&
    css`
      width: 100%;
      font-size: 1.125rem;
      padding: 0.45rem;
    `};

  ${props =>
    props.green &&
    css`
      background-color: ${palette.green[2]};
      &:hover {
        background-color: ${palette.green[3]};
      }
    `}
`;

const Button = props => <StyledButton {...props} />;

export default Button;
