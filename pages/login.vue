<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h1 class="login-title">Sign In to Your Account</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <UIBaseInput
          id="login"
          v-model="form.login"
          label="Login"
          placeholder="Enter your login"
          type="text"
          :error="errors.login"
        />

        <UIBaseInput
          id="password"
          v-model="form.password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          :error="errors.password"
        />

        <div class="form-options">
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <UIBaseButton class="login-button">Sign In</UIBaseButton>

        <div class="register-link">
          Don't have an account? <NuxtLink to="/register">Create Account</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();

const form = reactive({
  login: "",
  password: "",
});

const errors = reactive({
  login: "",
  password: "",
});

const handleLogin = async () => {
  errors.login = "";
  errors.password = "";

  let isValid = true;

  if (!form.login) {
    errors.login = "Login is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.login)) {
    errors.login = "Please enter a valid login";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (isValid) {
    await authStore.login(form.login, form.password);
  }
};
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - $header-height);
  padding: 40px 20px;
}

.login-form-wrapper {
  background-color: rgba($dark-background, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 2rem;
  color: $light-text;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
}

.login-form {
  margin-bottom: 2rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

.forgot-password {
  color: $primary-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.login-button {
  width: 100%;
  margin-bottom: 1.5rem;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: $light-text;

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: $mobile) {
  .login-form-wrapper {
    padding: 30px 20px;
  }

  .login-title {
    font-size: 1.75rem;
  }

  .social-buttons {
    flex-direction: column;
  }
}
</style>
