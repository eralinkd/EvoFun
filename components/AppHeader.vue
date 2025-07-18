<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-content">
      <NuxtLink to="/" class="logo">EVO FUN</NuxtLink>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item"><NuxtLink to="/">Main</NuxtLink></li>
          <li class="nav-item"><a href="#">Games</a></li>
          <li class="nav-item"><a href="#">Rules</a></li>

          <template v-if="!userStore.isAuthenticated()">
            <li class="nav-item"><NuxtLink to="/login">Sign In</NuxtLink></li>
          </template>

          <template v-else>
            <li class="nav-item balance-display">
              <span class="balance-text"
                >Balance: ${{ userStore.userProfile.balance || 0 }}</span
              >
            </li>
            <li class="nav-item"><NuxtLink to="/profile">Profile</NuxtLink></li>
            <li class="nav-item">
              <a href="#" @click.prevent="handleLogout" class="logout-link"
                >Logout</a
              >
            </li>
          </template>

          <li class="nav-item">
            <a href="https://t.me/Yevhen_Matv">Support</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useAuthStore } from "~/stores/authStore";

const isScrolled = ref(false);
const userStore = useUserStore();
const authStore = useAuthStore();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleLogout = async () => {
  authStore.clearTokens();
  window.location.reload();
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

  .logout-link {
    cursor: pointer;

    &:hover {
      color: #ff6b6b !important;
    }
  }

  .balance-display {
    .balance-text {
      background-color: rgba($primary-color, 0.1);
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgba($primary-color, 0.3);
      color: $primary-color;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>
