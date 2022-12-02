import { useSelector } from "react-redux";
import styled from "styled-components";
import FollowingExhibitions from "./components/FollowingExhibitions";
import KakaoMap from "./components/KakaoMap";
import NearExhibitions from "./components/NearExhibitions";

function MainPage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <MainPageContainer>
      <MainPageTitle>👀 마음에 드는 전시회를 찾아보세요</MainPageTitle>
      <ContentContainer>
        <MapContainer>
          <KakaoMap />
        </MapContainer>
        <SideMenuContainer>
          <SideMenu>
            <SideMenuTitle>💡 우리 동네 전시회</SideMenuTitle>
            <SideMenuContent>
              <NearExhibitions />
            </SideMenuContent>
          </SideMenu>
          <SideMenu>
            <SideMenuTitle>💡 내가 팔로우하는 사용자의 전시회</SideMenuTitle>
            <SideMenuContent>
              {isLoggedIn ? (
                <FollowingExhibitions />
              ) : (
                <>Login to follow others!</>
              )}
            </SideMenuContent>
          </SideMenu>
        </SideMenuContainer>
      </ContentContainer>
    </MainPageContainer>
  );
}
export default MainPage;

const SideMenuContent = styled.div`
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  height: 230px;
  /* width: 300px; */
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SideMenuTitle = styled.div`
  color: ${(props) => props.theme.colors.description}
  font-size: ${(props) => props.theme.fontSizes.subtitle};
`;
const SideMenu = styled.div`
  /* height: 48%; */
  border-radius: 10px;
`;
const SideMenuContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MapContainer = styled.div`
  height: 100%;
  /* width: 70%; */
  background-color: white;
  flex-grow: 2.5;
  flex-basis: 60%;
  margin-right: 30px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
`;
const MainPageTitle = styled.div`
  margin-top: 30px;
  color: ${(props) => props.theme.colors.description};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  height: 550px;
`;
const MainPageContainer = styled.div`
  width: 100%;
`;
