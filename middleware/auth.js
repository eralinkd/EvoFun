export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return navigateTo("/login");
  }
});
