import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { GET_NEAR } from "../../../api/exhibitionAPI";

function NearExhibitions() {
  const location = useSelector((state) => state.user.location);
  // latitude, longitude
  // 고덕역 37.554229535691064, 127.15349448125242
  // 강동역 37.53529779594927, 127.13263739329967
  // 굽은다리역 37.54541334690777, 127.14265848973925
  // 광나루역 37.54550881010471, 127.10282696252985

  const target_area = {
    maxLatitude: location.latitude + 0.01893173974,
    minLatitude: location.latitude - 0.01893173974,
    maxLongitude: location.longitude + 0.0398315272,
    minLongitude: location.longitude - 0.0398315272,
  };
  const { data, isLoading, isFetched, refetch } = useQuery(
    ["get_near", target_area],
    () => GET_NEAR(target_area),
    {
      onSuccess: (data) => {
        console.log(target_area);
        console.log(data);
      },
    }
  );
  return <>{location.latitude}</>;
}
export default NearExhibitions;
