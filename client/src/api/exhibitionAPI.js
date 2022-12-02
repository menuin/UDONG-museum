import axios from "axios";

const GET_NEAR = async (data) => {
  try {
    const response = await axios.post("/api/exhibitions/near", data);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.message,
    };
  }
};
const createExhibition = () => {};
const deleteExhibition = () => {};
const editExhibition = () => {};
const getExhibition = () => {};
const listUpExhibition = () => {};

export {
  GET_NEAR,
  createExhibition,
  deleteExhibition,
  editExhibition,
  getExhibition,
  listUpExhibition,
};
