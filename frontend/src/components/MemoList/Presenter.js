import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../ButtonComponent";
import { Link } from "react-router-dom";

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

const MemoItem = ({ memo }) => {
  const { user, title, body, publishedDate, _id } = memo;
  return (
    <MemoItemBlock>
      <Link to={`/@${user.username}/${_id}`}>
        <StyledHeader>{title}</StyledHeader>
      </Link>
      <SubInfo>
        {user.username} / {new Date(publishedDate).toLocaleDateString()}
      </SubInfo>
      <p>{body}</p>
    </MemoItemBlock>
  );
};

const Presenter = ({ loading, error, memos, showWriteBtn }) => {
  if (error) {
    return <Wrapper>에러가 발생했습니다.</Wrapper>;
  }
  return (
    <Wrapper>
      <BtnWrapper>
        {showWriteBtn && (
          <Button green to="/write">
            새 글 작성하기
          </Button>
        )}
      </BtnWrapper>
      <MemoItemWrapper>
        {!loading && memos && (
          <div>
            {memos.map((memo) => (
              <MemoItem memo={memo} key={memo._id} />
            ))}
          </div>
        )}
      </MemoItemWrapper>
    </Wrapper>
  );
};

export default Presenter;
