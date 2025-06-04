import { useNuxtApp } from "#app";

const useUserApi = () => {
  const { $api } = useNuxtApp();

  const getUser = async () => {
    try {
      const response = await $api.get("/profile/me");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await $api.patch("/profile/update", data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getUser,
    updateUser,
  };
};

export default useUserApi;
