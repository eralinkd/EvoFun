<template>
  <div>
    <div class="hero-banner">
          <div class="hero-content">
      <h1 class="hero-title">Welcome to EVO_FUN!</h1>
      <p class="hero-subtitle">Play your favorite games and try your luck</p>
      
      <div v-if="userStore.isAuthenticated" class="user-welcome">
        <p class="welcome-text">Welcome back, {{ userStore.nickName || 'User' }}!</p>
        <div class="action-buttons">
          <UIBaseButton>Play now</UIBaseButton>
          <NuxtLink to="/profile">
            <UIBaseButton class="profile-btn">View Profile</UIBaseButton>
          </NuxtLink>
        </div>
      </div>
      
      <div v-else class="guest-actions">
        <UIBaseButton>Play now</UIBaseButton>
      </div>
    </div>
    </div>
    
    <ImageGallery />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.hero-banner {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba($dark-background, 0.9) 0%,
      rgba($background-color, 0.8) 100%
    );
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 20% 50%,
        rgba($primary-color, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 30%,
        rgba($secondary-color, 0.1) 0%,
        transparent 50%
      );
    opacity: 0.6;
    z-index: 0;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  color: $light-text;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: $light-text;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.user-welcome {
  .welcome-text {
    font-size: 1.25rem;
    color: $primary-color;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;

    .profile-btn {
      background-color: transparent;
      border: 2px solid $primary-color;
      color: $primary-color;

      &:hover {
        background-color: $primary-color;
        color: white;
      }
    }
  }
}

.guest-actions {
  .auth-links {
    margin-top: 2rem;
    font-size: 1.1rem;

    a {
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: $light-text;
      margin: 0 1rem;
    }
  }
}

@media (max-width: $tablet) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
