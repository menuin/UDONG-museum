import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GET_ME } from "../api/userAPI";
import { userActions } from "../store/userSlice";

const Me = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn,
    shallowEqual
  );
  const [isCoordsReady, setIsCoordsReady] = useState(false);
  const { data, isLoading, isFetched, refetch } = useQuery("get_me", GET_ME, {
    // staleTime: Infinity, // fetch only once
    onSuccess: (data) => {
      dispatch(userActions.me(data.data));
    },
  });
  // useEffect(() => {
  //   if (!isCoordsReady) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       const location = {
  //         latitude,
  //         longitude,
  //       };
  //       dispatch(userActions.setLocation(location));
  //       setIsCoordsReady(true);
  //     });
  //   }
  // });

  return isLoggedIn ? isFetched ? children : <>loading page</> : children;
};
export default Me;
