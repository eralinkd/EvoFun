import { createNotivue } from "notivue";

export default defineNuxtPlugin(({ vueApp }) => {
  const notivue = createNotivue({
    position: "top-center",
    limit: 5,
    enqueue: true,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  });

  vueApp.use(notivue);
});
