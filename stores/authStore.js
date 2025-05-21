import { defineStore } from "pinia";
import useAuthApi from "~/api/auth";
import { computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const { postRefreshToken, postLogin } = useAuthApi();
  const { $loader } = useNuxtApp();
  
  const accessToken = computed(
    () => localStorage.getItem("accessToken") || null
  );
  const refreshToken = computed(
    () => localStorage.getItem("refreshToken") || null
  );

  const setTokens = (access, refresh) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const doRefreshToken = async () => {
    const response = await postRefreshToken(refreshToken.value);
    return response;
  };

  const login = async (email, password) => {
    $loader.show();
    try {
      const response = await postLogin({ email, password });
      setTokens(response.data.data.access, response.data.data.refresh);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      $loader.hide();
    }
  };

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearTokens,
    doRefreshToken,
    login,
  };
});
