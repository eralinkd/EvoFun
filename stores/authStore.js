import { defineStore } from "pinia";
import useAuthApi from "~/api/auth";
import { computed } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useShowNotivue } from "~/composables/useNotivue";

export const useAuthStore = defineStore("auth", () => {
  const { postRefreshToken, postLogin, postRegister } = useAuthApi();
  const { $loader } = useNuxtApp();
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
    $loader.show();
    try {
      const response = await postLogin({ login, pass });

      if (response.data) {
        const { token, userId, nickName } = response.data;

        // Save token as accessToken
        localStorage.setItem("accessToken", token);

        // Save user data in userStore
        userStore.setUserData(userId, nickName);

        // Try to load full user profile
        try {
          await userStore.fetchUserProfile();
        } catch (profileError) {
          console.warn("Could not load user profile:", profileError);
        }

        success("Successfully signed in!");

        // Redirect to home page
        await navigateTo("/");

        return response;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Error signing in");
      throw err;
    } finally {
      $loader.hide();
    }
  };

  const register = async (data) => {
    $loader.show();
    try {
      const response = await postRegister(data);

      if (response.data) {
        success("Registration successful! You can now sign in.");

        // Redirect to login page
        await navigateTo("/login");

        return response;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Registration error");
      throw err;
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
    register,
  };
});
