import axios from "axios";

const useAuthApi = () => {
  const nuxtApp = useNuxtApp();
  const baseUrl = nuxtApp.$config.public.API_URL;

  const postRegister = async (data) => {
    nuxtApp.$loader.show();
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      nuxtApp.$loader.hide();
    }
  };

  const postLogin = async (data) => {
    nuxtApp.$loader.show();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.token);
      // localStorage.setItem("refreshToken", response.data.data.refresh);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      nuxtApp.$loader.hide();
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      navigateTo("/");
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
      localStorage.setItem("accessToken", response.data.data.token);
      // localStorage.setItem("refreshToken", response.data.data.refresh);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    postRegister,
    postLogin,
    logout,
    postRefreshToken,
  };
};

export default useAuthApi;
