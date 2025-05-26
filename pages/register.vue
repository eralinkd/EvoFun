<template>
  <div class="register-container">
    <div class="register-form-wrapper">
      <h1 class="register-title">Create Account</h1>

      <form class="register-form" @submit.prevent="handleRegister">
        <UIBaseInput
          id="name"
          v-model="form.name"
          label="First Name"
          placeholder="Enter your first name"
          type="text"
          :error="errors.name"
        />

        <UIBaseInput
          id="surname"
          v-model="form.surname"
          label="Last Name"
          placeholder="Enter your last name"
          type="text"
          :error="errors.surname"
        />

        <UIBaseInput
          id="nickname"
          v-model="form.nickname"
          label="Nickname"
          placeholder="Enter your nickname"
          type="text"
          :error="errors.nickname"
        />

        <UIBaseInput
          id="phoneNumber"
          v-model="form.phoneNumber"
          label="Phone Number"
          placeholder="26296529800900"
          type="tel"
          :error="errors.phoneNumber"
        />

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
          v-model="form.pass"
          label="Password"
          placeholder="Enter your password"
          type="password"
          :error="errors.pass"
        />

        <UIBaseInput
          id="confirmPassword"
          v-model="form.confirmPassword"
          label="Confirm Password"
          placeholder="Repeat your password"
          type="password"
          :error="errors.confirmPassword"
        />

        <UIBaseButton class="register-button">Create Account</UIBaseButton>

        <div class="login-link">
          Already have an account? <NuxtLink to="/login">Sign In</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();

const form = reactive({
  name: "",
  surname: "",
  nickname: "",
  phoneNumber: "",
  email: "",
  pass: "",
  confirmPassword: "",
});

const errors = reactive({
  name: "",
  surname: "",
  nickname: "",
  phoneNumber: "",
  email: "",
  pass: "",
  confirmPassword: "",
});

const validateForm = () => {
  // Очищаем предыдущие ошибки
  Object.keys(errors).forEach(key => {
    errors[key] = "";
  });

  let isValid = true;

  if (!form.name.trim()) {
    errors.name = "First name is required";
    isValid = false;
  }

  if (!form.surname.trim()) {
    errors.surname = "Last name is required";
    isValid = false;
  }

  if (!form.nickname.trim()) {
    errors.nickname = "Nickname is required";
    isValid = false;
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
    isValid = false;
  } else if (!/^\d+$/.test(form.phoneNumber)) {
    errors.phoneNumber = "Phone number should contain only digits";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.pass) {
    errors.pass = "Password is required";
    isValid = false;
  } else if (form.pass.length < 6) {
    errors.pass = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Password confirmation is required";
    isValid = false;
  } else if (form.pass !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    // Подготавливаем данные для отправки (исключаем confirmPassword)
    const { confirmPassword, ...registerData } = form;
    
    await authStore.register(registerData);
  } catch (error) {
    // Ошибка уже обработана в store
  }
};
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - $header-height);
  padding: 40px 20px;
}

.register-form-wrapper {
  background-color: rgba($dark-background, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.register-title {
  font-size: 2rem;
  color: $light-text;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
}

.register-form {
  margin-bottom: 2rem;
}

.register-button {
  width: 100%;
  margin-bottom: 1.5rem;
}

.login-link {
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
  .register-form-wrapper {
    padding: 30px 20px;
  }

  .register-title {
    font-size: 1.75rem;
  }
}
</style> 