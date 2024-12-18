import { create } from "zustand";
import axios from "axios";
import { withPersistAndDevtools } from "./persistStorage";
axios.defaults.withCredentials = true;

export const useAuthStore = create(
  withPersistAndDevtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: false,
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

      login: async (email, password) => {
        set({ isLoading: true, error: null }, false, "Login start");
        try {
          const response = await axios.post(`/api/auth/login`, {
            email,
            password,
          });
          set(
            {
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            },
            false,
            "Login success"
          );
        } catch (error) {
          set(
            {
              error: error.response?.data?.message || "Error logging in",
              isLoading: false,
            },
            false,
            "Login failure"
          );
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null }, false, "Logout start");
        try {
          await axios.post(`/api/auth/logout`);
          set(
            {
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            },
            false,
            "Logout success"
          );
        } catch (error) {
          set(
            {
              error: error.response?.data?.message || "Error logging out",
              isLoading: false,
            },
            false,
            "Logout failure"
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
            "Verify email success"
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
              error: null,
            },
            false,
            "Check auth success"
          );
        } catch (error) {
          set(
            {
              isCheckingAuth: false,
              error: null,
              isAuthenticated: false,
              user: null,
            },
            false,
            "Check auth failure"
          );
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null }, false, "Forgot password start");
        try {
          const response = await axios.post(`/api/auth/forgot-password`, {
            email,
          });
          set(
            {
              isLoading: false,
              error: null,
              message: response.data.message,
            },
            false,
            "Forgot password success"
          );
        } catch (error) {
          set(
            {
              isLoading: false,
              error: error.response?.data?.message || "Error forgot password",
            },
            false,
            "Forgot password failure"
          );
          throw error;
        }
      },

      resetPassword: async (token, password) => {
        set(
          { isLoading: true, error: null, message: null },
          false,
          "Reset password start"
        );
        try {
          const response = await axios.post(
            `/api/auth/reset-password/${token}`,
            {
              password,
            }
          );
          set(
            {
              isLoading: false,
              error: null,
            },
            false,
            "Reset password success"
          );
        } catch (error) {
          set(
            {
              isLoading: false,
              error: error.response?.data?.message || "Error reset password",
            },
            false,
            "Reset password failure"
          );
          throw error;
        }
      },
    }),
    "auth" // Уникальное имя для persist
  )
);
