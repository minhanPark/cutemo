import React from "react";
import styled from "styled-components";
import Button from "../ButtonComponent";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 1rem auto;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
  }
`;

const Presenter = ({ onCancel, onPublish }) => {
  return (
    <Wrapper>
      <StyledButton green onClick={onPublish}>
        메모 등록
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </Wrapper>
  );
};

export default Presenter;
