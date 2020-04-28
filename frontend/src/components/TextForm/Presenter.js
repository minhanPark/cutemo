import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 2rem;
  padding: 1rem 1.2rem;
  margin: 25px auto;
  border: none;
  border-bottom: 1.5px solid ${palette.gray[4]};
  outline: none;
  box-sizing: border-box;
  font-weight: 600;
`;

const BodyInput = styled.textarea`
  width: 100%;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  height: 50vh;
  outline: none;
  border: 1.5px solid ${palette.gray[4]};
  resize: none;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Presenter = ({ title, body, onChange }) => {
  const onChangeTitle = (e) => {
    onChange({ key: "title", value: e.target.value });
  };
  const onChangeBody = (e) => {
    onChange({ key: "body", value: e.target.value });
  };
  return (
    <Wrapper>
      <TitleInput name="title" value={title} onChange={onChangeTitle} />
      <div>
        <BodyInput name="body" value={body} onChange={onChangeBody} />
      </div>
    </Wrapper>
  );
};

export default Presenter;
