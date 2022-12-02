import styled, { css } from "styled-components";

function Photo({ photo }) {
  return (
    <PhotoContainer>
      <PhotoCover enabled={photo.used}>{photo.used && "전시중"}</PhotoCover>
      <PhotoImg>{photo.description}</PhotoImg>
    </PhotoContainer>
  );
}

export default Photo;

const PhotoContainer = styled.div`
  width: 320px;
  height: 320px;
  position: relative;
  background-color: #c8c8c8;
  flex-shrink: 0;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const PhotoCover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  ${(props) =>
    props.enabled &&
    css`
      background-color: black;
      opacity: 0.5;
      color: white;
    `}
`;
const PhotoImg = styled.div`
  color: beige;
`;
