import { defineStore } from "pinia";
import useAuthApi from "~/api/auth";
import { computed } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useShowNotivue } from "~/composables/useNotivue";

export const useAuthStore = defineStore("auth", () => {
  const { postRefreshToken, postLogin, postRegister } = useAuthApi();
  const nuxtApp = useNuxtApp();
  const userStore = useUserStore();
  const { success, error } = useShowNotivue();

  const accessToken = computed(
    () => localStorage.getItem("accessToken") || null
  );
  const refreshToken = computed(
    () => localStorage.getItem("refreshToken") || null
  );

  const setTokens = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    userStore.clearUserData();
  };

  const doRefreshToken = async () => {
    const response = await postRefreshToken(refreshToken.value);
    return response;
  };

  const login = async (login, pass) => {
    nuxtApp.$loader.show();
    try {
      const response = await postLogin({ login, pass });
      if (response) {
        const { token, userId, nickName } = response;
        localStorage.setItem("accessToken", token);
        userStore.setUserData(userId, nickName);
        try {
          await userStore.fetchUserProfile();
        } catch (profileError) {
          console.warn("Could not load user profile:", profileError);
        }
        await navigateTo("/");

        return response;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Error signing in");
      throw err;
    } finally {
      nuxtApp.$loader.hide();
    }
  };

  const register = async (data) => {
    nuxtApp.$loader.show();
    try {
      const response = await postRegister(data);

      if (response.status === 201) {
        success("Registration successful! You can now log in.");

        // Redirect to login page
        await navigateTo("/login");

        return response;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Registration error");
      throw err;
    } finally {
      nuxtApp.$loader.hide();
    }
  };

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearTokens,
    doRefreshToken,
    login,
    register,
  };
});
