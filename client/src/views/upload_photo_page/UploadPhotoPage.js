import styled, { css } from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UPLOAD_PHOTO } from "../../api/photoAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UploadPhotoPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { mutate: upload } = useMutation(UPLOAD_PHOTO);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm();
  const onFormSubmit = () => {
    const { photo, title, description } = getValues();
    const data = {
      photo,
      title,
      description,
    };
    console.log(data);
    upload(data, {
      onSuccess: (res) => {
        if (res.data.registerPhotoSuccess) {
          navigate(`/profile/${user._id}`);
        }
      },
    });
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PhotoFormContainer>
        <UploadForm onSubmit={handleSubmit(onFormSubmit)}>
          <div style={{ fontSize: "30px" }}>사진 등록하기</div>
          <UploadFormInputs>
            <label htmlFor="photo">
              <UploadPhotoInput>
                <IoIosAddCircleOutline size={50} />
              </UploadPhotoInput>
            </label>
            <input
              type="file"
              id="photo"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              {...register("photo", {
                required: "Photo is required",
              })}
            />
            <UploadInfoInput>
              <FormLabel htmlFor="title">제목</FormLabel>
              <TitleInput
                type="text"
                id="title"
                {...register("title", {
                  required: "Title is required",
                })}
                isError={errors.title}
              ></TitleInput>
              <FormLabel htmlFor="description">설명</FormLabel>
              <DescriptionInput
                type="text"
                id="description"
                {...register("description")}
              />
            </UploadInfoInput>
          </UploadFormInputs>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "right" }}
          >
            <FormSubmitBtn>등록하기</FormSubmitBtn>
          </div>
        </UploadForm>
      </PhotoFormContainer>
    </div>
  );
}
export default UploadPhotoPage;

const PhotoFormContainer = styled.div`
  margin-top: 20px;
  width: 1000px;
`;

const UploadForm = styled.form``;
const UploadFormInputs = styled.div`
  display: flex;
  margin-top: 20px;
`;
const UploadPhotoInput = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background-color: #f2f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: gray;
    cursor: pointer;
  }
`;
const UploadInfoInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  font-size: 20px;
  /* background-color: beige; */
  flex-grow: 1;
  /* margin-top: 20px; */
`;
const FormLabel = styled.label`
  margin-top: 20px;
`;
const TitleInput = styled.input`
  /* width: 100%; */
  margin-top: 10px;
  background-color: #f2f6f9;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  font-family: "Noto Sans KR", sans-serif;
  ${(props) =>
    props.isError &&
    css`
      border: 1px solid ${(props) => props.theme.colors.error};
    `}
`;
const DescriptionInput = styled.textarea`
  margin-top: 10px;
  background-color: #f2f6f9;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  resize: none;
  flex-grow: 1;
  font-family: "Noto Sans KR", sans-serif;
`;
const FormSubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 40px;
  border-radius: 7px;
  margin-top: 20px;
  /* font-weight: bold; */
  background-color: ${(props) => props.theme.colors.point};
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
