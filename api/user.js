export const useUserApi = () => {
  
  const getUser = async () => {
    const { $loader, $api } = useNuxtApp();
    $loader.show();
    try {
      const response = await $api.get("/profile/me");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      $loader.hide();
    }
  };

  const updateUser = async (data) => {
    const { $loader, $api } = useNuxtApp();
    $loader.show();
    try {
      const response = await $api.patch("/profile/update", data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      $loader.hide();
    }
  };

  return {
    getUser,
    updateUser,
  };
};
