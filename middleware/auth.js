export default defineNuxtRouteMiddleware((to, from) => {
  const { $router } = useNuxtApp();
  
  // Проверяем наличие токена в localStorage
  if (process.client) {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      // Если токена нет, перенаправляем на страницу логина
      return navigateTo('/login');
    }
  }
}); 