<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-content">
      <div class="logo">EVO_FUN</div>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item"><NuxtLink to="/">Main</NuxtLink></li>
          <li class="nav-item"><a href="#">Gallery</a></li>
          <li class="nav-item"><a href="#">Games</a></li>
          <li class="nav-item"><a href="#">Rules</a></li>
          <li class="nav-item"><a href="#">Win Calculator</a></li>
          <li class="nav-item"><NuxtLink to="/login">Login</NuxtLink></li>
          <li class="nav-item"><a href="#">Support</a></li>
          <li class="nav-item"><a href="#">Personal cabinet</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  background-color: rgba($dark-background, 0.95);
  backdrop-filter: blur(5px);
  z-index: $z-header;
  transition: height $transition-speed $transition-ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &.scrolled {
    height: $header-height-scrolled;
  }

  .header-content {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 28px;
    font-weight: 700;
    color: $light-text;
    text-decoration: none;
    letter-spacing: 1px;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 24px;
  }

  .nav-item a,
  .nav-item {
    color: $light-text;
    text-decoration: none;
    font-size: 16px;
    transition: color $transition-speed $transition-ease;
    opacity: 0.9;

    &:hover {
      color: $primary-color;
      opacity: 1;
    }
  }
}
</style>
