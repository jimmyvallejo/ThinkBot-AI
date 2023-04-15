import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? "http://127.0.0.1:5001/miami-hackathon-ai/us-central1/api"
    : "https://us-central1-miami-hackathon-ai.cloudfunctions.net/api";

export const get = async (url) => {
  try {
    const res = await axios.get(`${baseUrl}${url}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const post = async ({ url, data }) => {
  try {
    const res = await axios.post(`${baseUrl}${url}`, data);

    return res;
  } catch (e) {
    console.error(e);
  }
};
