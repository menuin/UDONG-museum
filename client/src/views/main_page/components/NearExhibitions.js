import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { GET_NEAR } from "../../../api/exhibitionAPI";
import ExhibitionCard from "./ExhibitionCard";
import { userActions } from "../../../store/userSlice";
import { exhibitionActions } from "../../../store/exhibitionSlice";

function NearExhibitions() {
  const dispatch = useDispatch();
  const [exhibitions, setExhibitions] = useState([]);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  const target_area = {
    maxLatitude: location.latitude + 0.01893173974,
    minLatitude: location.latitude - 0.01893173974,
    maxLongitude: location.longitude + 0.0398315272,
    minLongitude: location.longitude - 0.0398315272,
  };
  // const location = useSelector((state) => state.user.location);
  // const location = {
  //   latitude: 37.557415823247524,
  //   longitude: 127.04456318113543,
  // };
  // latitude, longitude
  // 고덕역 37.554229535691064, 127.15349448125242
  // 둔촌동역 37.52879722542752, 127.13646109077611
  // 굽은다리역 37.54541334690777, 127.14265848973925
  // 광나루역 37.54568006861791, 127.10274798678142
  const { data, isLoading, isFetched, refetch } = useQuery(
    ["get_near", target_area],
    () => GET_NEAR(target_area),
    {
      onSuccess: (data) => {
        setExhibitions(data.data.exhibitions);
        dispatch(exhibitionActions.near(data.data.exhibitions));
      },
    }
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const crnt_location = {
        latitude,
        longitude,
      };
      setLocation(crnt_location);
      dispatch(userActions.setLocation(crnt_location));
    });
  }, []);

  return (
    <>
      {exhibitions?.length !== 0 ? (
        <>
          {exhibitions.map((exhibition, idx) => (
            <ExhibitionCard exhibition={exhibition} key={idx} />
          ))}
        </>
      ) : (
        <>No exhibition nearby!</>
      )}
    </>
  );
}
export default NearExhibitions;
