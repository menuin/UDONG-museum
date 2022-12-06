import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { CREATE_EXHIBITION } from "../../api/exhibitionAPI";
import { PHOTO_LISTUP } from "../../api/photoAPI";
import * as S from "../../components/uploadForm/UploadForm_Style";
import * as D from "../../components/feed/Feed_Style";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function OpenExhibitionPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [uploads, setUploads] = useState([]);
  const { mutate: open } = useMutation(CREATE_EXHIBITION);
  const { register, handleSubmit, getValues } = useForm();
  let { id: uid } = useSelector((state) => state.user.user);
  const { data: photo_listup_data } = useQuery(
    ["photo_listup", uid],
    () => PHOTO_LISTUP(uid),
    {
      onSuccess: (photo_listup_data) => {
        if (photo_listup_data.data.listUpPhotoSuccess) {
          setPhotos(photo_listup_data.data.photos);
        }
      },
    }
  );
  const onFormSubmit = () => {
    const { title, start_date, end_date, description } = getValues();
    const data = {
      name: title,
      startDate: start_date,
      endDate: end_date,
      description,
      photos: uploads,
    };
    open(data, {
      onSuccess: (res) => {
        if (res.data.registerExhibitionSuccess) {
          navigate(`/${uid}`);
        }
      },
    });
  };
  const toggleCheck = (pid, used) => {
    if (!used) {
      if (uploads.includes(pid)) {
        setUploads(uploads.filter((id) => id !== pid));
      } else {
        setUploads([...uploads, pid]);
      }
    }
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <S.UploadFormContainer>
        <S.UploadInfoInputContainer>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div style={{ fontSize: "30px" }}>전시회 열기</div>
            <S.UploadFormInputs style={{ marginBottom: "50px" }}>
              <S.UploadInfoInputContainer>
                <S.InfoInput>
                  <S.FormLabel htmlFor="title">제목</S.FormLabel>
                  <S.TitleInput
                    type="text"
                    id="title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                </S.InfoInput>

                <S.InfoInput>
                  <S.FormLabel htmlFor="start_date">시작일</S.FormLabel>
                  <S.DateInput
                    type="date"
                    id="start_date"
                    {...register("start_date")}
                  ></S.DateInput>
                  <S.InfoInput style={{ flexGrow: "1", marginLeft: "10px" }}>
                    <S.FormLabel htmlFor="end_date">종료일</S.FormLabel>
                    <S.DateInput
                      type="date"
                      id="end_date"
                      {...register("end_date")}
                    ></S.DateInput>
                  </S.InfoInput>
                </S.InfoInput>
                <S.InfoInput>
                  <S.FormLabel htmlFor="description">설명</S.FormLabel>
                  <S.DescriptionInput
                    type="text"
                    id="description"
                    {...register("description")}
                  />
                </S.InfoInput>
              </S.UploadInfoInputContainer>
              <MapContainer></MapContainer>
            </S.UploadFormInputs>
            <D.FeedContainer>
              {photos.map(({ _id: pid, used, title }, index) => (
                <D.PhotoContainer
                  key={index}
                  onClick={() => toggleCheck(pid, used)}
                >
                  {used ? (
                    <D.PhotoCover enabled={used}>
                      {used && "전시중"}
                    </D.PhotoCover>
                  ) : (
                    <CheckBtnContainer>
                      {uploads.includes(pid) ? (
                        <BsCheckCircleFill size={30} />
                      ) : (
                        <BsCheckCircle size={30} />
                      )}
                    </CheckBtnContainer>
                  )}

                  <D.PhotoImg>{title}</D.PhotoImg>
                </D.PhotoContainer>
              ))}
            </D.FeedContainer>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <FormSubmitBtn>등록하기</FormSubmitBtn>
            </div>
          </form>
        </S.UploadInfoInputContainer>
      </S.UploadFormContainer>
    </div>
  );
}

export default OpenExhibitionPage;

const FormSubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border-radius: 7px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const MapContainer = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 20px;
  background-color: #f2f6f9;
  margin-left: 50px;
`;
const CheckBtnContainer = styled.div`
  padding: 10px;
  width: 100%;
  position: absolute;
  opacity: 1;
  display: flex;
  justify-content: flex-end;
  color: white;
`;
