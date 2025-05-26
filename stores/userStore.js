import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useUserApi from "~/api/user";
import { useShowNotivue } from "~/composables/useNotivue";

export const useUserStore = defineStore("user", () => {
  const { getUser, updateUser } = useUserApi();
  const { success, error } = useShowNotivue();
  
  const userId = ref(null);
  const nickName = ref(null);
  const userProfile = ref({
    userId: null,
    name: "",
    surname: "",
    nickname: "",
    phoneNumber: "",
    email: "",
    balance: 0
  });

  // Инициализация данных из localStorage только на клиенте
  if (process.client) {
    userId.value = localStorage.getItem("userId") || null;
    nickName.value = localStorage.getItem("nickName") || null;
  }

  const isAuthenticated = computed(() => {
    if (process.client) {
      return !!localStorage.getItem("accessToken");
    }
    return false;
  });

  const setUserData = (userIdValue, nickNameValue) => {
    userId.value = userIdValue;
    nickName.value = nickNameValue;
    localStorage.setItem("userId", userIdValue);
    localStorage.setItem("nickName", nickNameValue);
  };

  const setUserProfile = (profileData) => {
    userProfile.value = { ...userProfile.value, ...profileData };
  };

  const clearUserData = () => {
    userId.value = null;
    nickName.value = null;
    userProfile.value = {
      userId: null,
      name: "",
      surname: "",
      nickname: "",
      phoneNumber: "",
      email: "",
      balance: 0
    };
    localStorage.removeItem("userId");
    localStorage.removeItem("nickName");
  };

  const fetchUserProfile = async () => {
    try {
      const response = await getUser();
      if (response?.data) {
        setUserProfile(response.data);
        return response.data;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Error loading profile");
      throw err;
    }
  };

  const updateUserProfile = async (data) => {
    try {
      const response = await updateUser(data);
      if (response?.data) {
        setUserProfile(response.data);
        success("Profile updated successfully!");
        return response.data;
      }
    } catch (err) {
      console.error(err);
      error(err.response?.data?.message || "Error updating profile");
      throw err;
    }
  };

  return {
    userId,
    nickName,
    userProfile,
    isAuthenticated,
    setUserData,
    setUserProfile,
    clearUserData,
    fetchUserProfile,
    updateUserProfile,
  };
}); 