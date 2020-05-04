import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../ButtonComponent";

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 1.5rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
`;

const MemoItemWrapper = styled.div`
  margin-top: 2rem;
`;

const MemoItemBlock = styled.div`
  border-bottom: 0.1rem solid ${palette.gray[5]};
  padding-bottom: 1.5rem;
  & + & {
    margin-top: 1.5rem;
  }
`;

const StyledHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${palette.gray[6]};
  margin: 0;
  &:hover {
    color: black;
  }
`;

const SubInfo = styled.h4`
  font-size: 1rem;
  color: ${palette.gray[5]};
  margin: 0;
  margin-top: 0.25rem;
`;

const MemoItem = () => {
  return (
    <MemoItemBlock>
      <StyledHeader>타이틀 타이틀</StyledHeader>
      <SubInfo>유저네임 / 2020-05-05</SubInfo>
      <p>이것이 메모로 남겼던 것들입니다. 확인해봥</p>
    </MemoItemBlock>
  );
};

const Presenter = () => {
  return (
    <Wrapper>
      <BtnWrapper>
        <Button green to="/write">
          새 글 작성하기
        </Button>
      </BtnWrapper>
      <MemoItemWrapper>
        <MemoItem />
        <MemoItem />
      </MemoItemWrapper>
    </Wrapper>
  );
};

export default Presenter;
