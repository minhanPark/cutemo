import React from "react";
import palette from "../../lib/styles/palette";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const StyledHeader = styled.h2`
  font-size: 1.5rem;
  border-bottom: 0.15rem solid ${palette.gray[4]};
  padding: 0.25rem 0.3rem;
`;

const SubInfo = styled.h4`
  font-size: 1rem;
  color: ${palette.gray[5]};
  text-align: right;
`;

const MemoBox = styled.div`
  border: 0.1rem solid ${palette.gray[5]};
  border-top-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  height: 40vh;
  padding: 1rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Presenter = ({ memo, loading, error }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <Wrapper>존재하지 않는 포스트입니다.</Wrapper>;
    }
    return <Wrapper>오류 발생!</Wrapper>;
  }
  if (loading || !memo) {
    return null;
  }
  const { title, body, publishedDate, user } = memo;
  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <StyledHeader>{title}</StyledHeader>
      <SubInfo>
        {user.username} / {new Date(publishedDate).toLocaleDateString()}
      </SubInfo>
      <MemoBox>
        <p>{body}</p>
      </MemoBox>
    </Wrapper>
  );
};

export default Presenter;
