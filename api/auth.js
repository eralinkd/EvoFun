import { useNuxtApp } from "#app";
import axios from "axios";
const useAuthApi = () => {
  const { $api, $loader, $config } = useNuxtApp();
  const baseUrl = $config.public.API_URL;

  const register = async (data) => {
    $loader.show();
    try {
      const response = await $api.post("/auth/register/", data);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      $loader.hide();
    }
  };

  const postLogin = async (data) => {
    $loader.show();
    try {
      const response = await axios.post(`${baseUrl}/auth/login/`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.data.access);
      localStorage.setItem("refreshToken", response.data.data.refresh);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      $loader.hide();
    }
  };

  const logout = async () => {
    try {
      const response = await $api.post("/auth/logout/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const postRefreshToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/refresh_token/`,
        {
          refresh: refreshToken,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", response.data.data.access);
      localStorage.setItem("refreshToken", response.data.data.refresh);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    postLogin,
    logout,
    postRefreshToken,
  };
};

export default useAuthApi;
