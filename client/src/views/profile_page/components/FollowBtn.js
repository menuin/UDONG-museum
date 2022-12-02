import { useMutation } from "react-query";
import styled from "styled-components";
import { FOLLOW, UNFOLLOW } from "../../../api/userAPI";

function FollowBtn({ uid, isFollowing, setIsFollowing }) {
  const { mutate: follow } = useMutation(FOLLOW);
  const { mutate: unfollow } = useMutation(UNFOLLOW);
  console.log(isFollowing);
  const toggleFollow = () => {
    if (isFollowing) {
      unfollow(uid, {
        onSuccess: (res) => {
          if (res.data.unfollowUserSuccess) {
            setIsFollowing(false);
          }
        },
      });
    } else {
      follow(uid, {
        onSuccess: (res) => {
          if (res.data.followUserSuccess) {
            setIsFollowing(true);
          }
        },
      });
    }
  };

  return (
    <FollowBtnContainer onClick={toggleFollow}>
      {isFollowing ? "unfollow" : "follow"}
    </FollowBtnContainer>
  );
}

export default FollowBtn;

const ProfileBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border-radius: 7px;
  margin-top: 20px;
  margin-right: 10px;
`;
const FollowBtnContainer = styled(ProfileBtn)`
  background-color: #2abce7;
  color: white;
`;
