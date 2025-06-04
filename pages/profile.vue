<template>
  <div class="profile-container">
    <div class="profile-wrapper">
      <div class="profile-header">
        <h1 class="profile-title">User Profile</h1>
        <div class="balance-info">
          <span class="balance-label">Balance:</span>
          <span class="balance-amount">${{ userProfile.balance || 0 }}</span>
        </div>
      </div>

      <div class="profile-content">
        <!-- View Mode -->
        <div v-if="!isEditing" class="profile-view">
          <div class="profile-info-grid">
            <div class="info-item">
              <label class="info-label">First Name</label>
              <div class="info-value">{{ userProfile.name || 'Not specified' }}</div>
            </div>

            <div class="info-item">
              <label class="info-label">Last Name</label>
              <div class="info-value">{{ userProfile.surname || 'Not specified' }}</div>
            </div>

            <div class="info-item">
              <label class="info-label">Nickname</label>
              <div class="info-value">{{ userProfile.nickname || 'Not specified' }}</div>
            </div>

            <div class="info-item">
              <label class="info-label">Phone Number</label>
              <div class="info-value">{{ userProfile.phoneNumber || 'Not specified' }}</div>
            </div>

            <div class="info-item">
              <label class="info-label">Email</label>
              <div class="info-value">{{ userProfile.email || 'Not specified' }}</div>
            </div>

            <div class="info-item">
              <label class="info-label">User ID</label>
              <div class="info-value">{{ userProfile.userId || 'Not specified' }}</div>
            </div>
          </div>

          <div class="profile-actions">
            <UIBaseButton @click="startEditing" class="edit-button">
              Edit Profile
            </UIBaseButton>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="profile-edit">
          <form @submit.prevent="handleUpdateProfile" class="edit-form">
            <div class="form-grid">
              <UIBaseInput
                id="name"
                v-model="editForm.name"
                label="First Name"
                placeholder="Enter your first name"
                type="text"
                :error="errors.name"
              />

              <UIBaseInput
                id="surname"
                v-model="editForm.surname"
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                :error="errors.surname"
              />

              <UIBaseInput
                id="nickname"
                v-model="editForm.nickname"
                label="Nickname"
                placeholder="Enter your nickname"
                type="text"
                :error="errors.nickname"
              />

              <UIBaseInput
                id="phoneNumber"
                v-model="editForm.phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                :error="errors.phoneNumber"
              />

              <UIBaseInput
                id="email"
                v-model="editForm.email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                :error="errors.email"
              />
            </div>

            <div class="form-actions">
              <UIBaseButton type="submit" class="save-button">
                Save Changes
              </UIBaseButton>
              <UIBaseButton 
                type="button" 
                @click="cancelEditing" 
                class="cancel-button"
              >
                Cancel
              </UIBaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";

definePageMeta({
  middleware: 'auth'
});

const userStore = useUserStore();
const { userProfile } = storeToRefs(userStore);

const isEditing = ref(false);
const editForm = reactive({
  name: "",
  surname: "",
  nickname: "",
  phoneNumber: "",
  email: ""
});

const errors = reactive({
  name: "",
  surname: "",
  nickname: "",
  phoneNumber: "",
  email: ""
});

onMounted(async () => {
  try {
    await userStore.fetchUserProfile();
  } catch (error) {
    console.error('Failed to load user profile:', error);
  }
});

const startEditing = () => {
  editForm.name = userProfile.value.name || "";
  editForm.surname = userProfile.value.surname || "";
  editForm.nickname = userProfile.value.nickname || "";
  editForm.phoneNumber = userProfile.value.phoneNumber || "";
  editForm.email = userProfile.value.email || "";
  
  Object.keys(errors).forEach(key => {
    errors[key] = "";
  });
  
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  Object.keys(editForm).forEach(key => {
    editForm[key] = "";
  });
  Object.keys(errors).forEach(key => {
    errors[key] = "";
  });
};

const validateForm = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = "";
  });

  let isValid = true;

  if (!editForm.name.trim()) {
    errors.name = "First name is required";
    isValid = false;
  }

  if (!editForm.surname.trim()) {
    errors.surname = "Last name is required";
    isValid = false;
  }

  if (!editForm.nickname.trim()) {
    errors.nickname = "Nickname is required";
    isValid = false;
  }

  if (!editForm.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
    isValid = false;
  } else if (!/^\d+$/.test(editForm.phoneNumber)) {
    errors.phoneNumber = "Phone number should contain only digits";
    isValid = false;
  }

  if (!editForm.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  return isValid;
};

const handleUpdateProfile = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await userStore.updateUserProfile(editForm);
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.profile-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: calc(100vh - $header-height);
  padding: 40px 20px;
}

.profile-wrapper {
  background-color: rgba($dark-background, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba($border-color, 0.3);
}

.profile-title {
  font-size: 2rem;
  color: $light-text;
  font-weight: 700;
  margin: 0;
}

.balance-info {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba($primary-color, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba($primary-color, 0.3);
}

.balance-label {
  color: $light-text;
  font-size: 14px;
  font-weight: 500;
}

.balance-amount {
  color: $primary-color;
  font-size: 18px;
  font-weight: 700;
}

.profile-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 14px;
  font-weight: 500;
  color: $light-text;
  opacity: 0.8;
}

.info-value {
  padding: 12px 16px;
  background-color: rgba($dark-background, 0.3);
  border: 1px solid rgba($border-color, 0.3);
  border-radius: 8px;
  color: $light-text;
  font-size: 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.profile-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.edit-button {
  background-color: $primary-color;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color $transition-speed $transition-ease;

  &:hover {
    background-color: rgba($primary-color, 0.8);
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 2rem;
}

.save-button {
  background-color: $primary-color;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color $transition-speed $transition-ease;

  &:hover {
    background-color: rgba($primary-color, 0.8);
  }
}

.cancel-button {
  background-color: transparent;
  color: $light-text;
  border: 2px solid rgba($border-color, 0.5);
  padding: 10px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-speed $transition-ease;

  &:hover {
    border-color: rgba($border-color, 0.8);
    background-color: rgba($border-color, 0.1);
  }
}

@media (max-width: $tablet) {
  .profile-wrapper {
    padding: 30px 20px;
  }

  .profile-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .profile-title {
    font-size: 1.75rem;
  }

  .profile-info-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: $mobile) {
  .profile-container {
    padding: 20px 10px;
  }

  .balance-info {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
}
</style> 