import React from "react";
import styled from "styled-components";
import Button from "../ButtonComponent";

const Wrapper = styled.div`
  width: 320px;
  margin: 1rem auto;
  display: flex;
  justify-content: space-around;
`;

const PageNum = styled.div``;

const Presenter = ({ page, lastPage }) => {
  console.log(lastPage);
  return (
    <Wrapper>
      <Button
        disabled={page === 1}
        to={page === 1 ? undefined : `/?page=${page - 1}`}
      >
        이전
      </Button>
      <PageNum>{page}</PageNum>
      <Button
        disabled={page === lastPage}
        to={page === lastPage ? undefined : `/?page=${page + 1}`}
      >
        다음
      </Button>
    </Wrapper>
  );
};

export default Presenter;
