import axios from "axios";

const UPLOAD_PHOTO = async (data) => {
  try {
    const response = await axios.post("/api/photos/register", data);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const EDIT_PHOTO = () => {};
const GET_PHOTO = () => {};
const DELETE_PHOTO = () => {};
const PHOTO_LISTUP = async (uid) => {
  try {
    const response = await axios.get(`/api/photos/${uid}/listUp`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};

export { UPLOAD_PHOTO, EDIT_PHOTO, GET_PHOTO, DELETE_PHOTO, PHOTO_LISTUP };
