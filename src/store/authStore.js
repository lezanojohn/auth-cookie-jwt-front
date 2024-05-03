// src/stores/authStore.js
import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    isLoading: false,
  }),
  actions: {
    async logIn(loginData) {
      try {
        const response = await axios.post("/login", loginData);
        this.isLoggedIn = true;
        this.user = response.data.user; // Asume que la API responde con datos del usuario
        console.log("Logged in:", response.data);
      } catch (error) {
        console.error("Login error:", error.response);
        throw new Error("Failed to login");
      }
    },
    async logOut() {
      try {
        await axios.post("/logout");
        this.isLoggedIn = false;
        this.user = null;
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    async validateSession() {
      try {
        const response = await axios.get("/validate-session");
        this.user = response.data.user;
        this.isLoggedIn = true;
      } catch (error) {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  },
});
