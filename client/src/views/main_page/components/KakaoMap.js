/* global kakao */

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MapCard from "./MapCard";

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
function KakaoMap() {
  const container = useRef(null);
  const location = useSelector((state) => state.user.location);
  const exhibitions = useSelector((state) => state.exhibition.near);

  let markers = [];
  useEffect(() => {
    // default coords
    // let latitude = 37.5666805;
    // let longitude = 126.9784147;

    let latitude = location?.latitude;
    let longitude = location?.longitude;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 6,
      scrollwheel: false,
    };
    const map = new window.kakao.maps.Map(container.current, options);

    exhibitions?.forEach((exhibition) => {
      const marker = new kakao.maps.Marker({
        map,
        title: exhibition.name,
        id: exhibition._id,
        position: new kakao.maps.LatLng(
          exhibition.latitude,
          exhibition.longitude
        ),
      });
      markers.push(marker);
      console.log(markers);
    });
  }, []);

  return <KakaoMapContainer ref={container}></KakaoMapContainer>;
}
export default KakaoMap;
