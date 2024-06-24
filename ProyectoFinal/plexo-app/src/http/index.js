import axios from "axios";

const api = axios.create({
  baseURL: "https://final-project-bootcamputp.onrender.com/api/",
  headers: {
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Type': 'application/json'
    },
  withCredentials: true,
});

export default api;