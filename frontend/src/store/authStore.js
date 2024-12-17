import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
      set({ isLoading: true, error: null }, false, "Signup start");
      try {
        const response = await axios.post(`/api/auth/signup`, {
          email,
          password,
          name,
        });
        set(
          {
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          },
          false,
          "Signup success"
        );
      } catch (error) {
        set(
          {
            error: error.response?.data?.message || "Error signing up",
            isLoading: false,
          },
          false,
          "Signup failure"
        );
        throw error;
      }
    },

    verifyEmail: async (code) => {
      set({ isLoading: true, error: null }, false, "Verify email start");
      try {
        const response = await axios.post(`/api/auth/verify-email`, { code });
        set(
          {
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          },
          false,
          "Verify email sucess"
        );
        return response.data;
      } catch (error) {
        set(
          {
            error: error.response?.data?.message || "Error verifying email",
            isLoading: false,
          },
          false,
          "Verify email failure"
        );
        throw error;
      }
    },

    checkAuth: async () => {
      set({ isCheckingAuth: true, error: null }, false, "Checking auth");
      try {
        const response = await axios.get(`/api/auth/check-auth`);
        set(
          {
            user: response.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          },
          false,
          "Check auth success"
        );
      } catch (error) {
        set(
          { isCheckingAuth: false, error: null, isAuthenticated: false },
          false,
          "Check auth failure"
        );
      }
    },
  }))
);
