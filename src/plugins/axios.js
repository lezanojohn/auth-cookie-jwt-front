// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Asegúrate de que la URL base es correcta para tu API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Importante para enviar cookies con las solicitudes
});

export default instance;
