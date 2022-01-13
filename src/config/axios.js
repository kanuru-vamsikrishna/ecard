import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:9999",
});

export default axios;
