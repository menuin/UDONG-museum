import { Link } from "react-router-dom";
import styled from "styled-components";

function ExhibitionCard({ exhibition }) {
  // GET_USER > get profile photo
  return (
    <Link to={`/exhibition/${exhibition._id}`}>
      <CardContainer>
        <ProfilePhoto></ProfilePhoto>
        <ExhibitionInfo>
          <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
          <ExhibitionOwner>{exhibition.user}</ExhibitionOwner>
        </ExhibitionInfo>
      </CardContainer>
    </Link>
  );
}
export default ExhibitionCard;

const CardContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
`;

const ProfilePhoto = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: white;
`;
const ExhibitionInfo = styled.div`
  align-items: flex-end;
  display: flex;
`;

const ExhibitionTitle = styled.div`
  color: white;
  font-size: 15px;
  margin-right: 5px;
`;
const ExhibitionOwner = styled.div`
  color: #a7a7a7;
  font-size: 12px;
`;
