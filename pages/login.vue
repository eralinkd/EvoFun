<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h1 class="login-title">Log in to your account</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <UIBaseInput
          id="email"
          v-model="form.email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          :error="errors.email"
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

        <UIBaseButton class="login-button">Login</UIBaseButton>

        <div class="register-link">
          Don't have an account? <a href="#">Register now</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
});

const handleLogin = () => {
  errors.email = "";
  errors.password = "";

  let isValid = true;

  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Please enter a valid email";
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
    console.log("Form submitted", form);
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
