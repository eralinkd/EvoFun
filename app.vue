<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </UApp>
</template>

<script setup>
import { onMounted } from "vue";
import { Notivue, Notification } from "notivue";

const config = useAppConfig();
config.ui = {
  colors: {
    primary: "blue",
    gray: "slate",
    neutral: "slate",
  },
  button: {
    default: {
      size: "lg",
      color: "blue",
      variant: "solid",
    },
  },
};

onMounted(() => {
  localStorage.setItem("nuxt-color-mode", "dark");
});
</script>
