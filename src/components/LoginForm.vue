<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" sm="8" md="5">
        <v-card>
          <v-card-title> Inicio de sesión </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="loginForm.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginForm.password"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
              <v-btn :disabled="!isValid" color="primary" type="submit">
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore);

const loginForm = ref({
  email: "usuario1@example.com",
  password: "password1",
});

const isValid = computed(() => {
  return loginForm.value.email !== "" && loginForm.value.password !== "";
});

async function submitForm() {
  isLoading.value = true;
  try {
    await authStore.logIn({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });
    router.push("/home");
  } catch (error) {
    alert("Login failed! Check console for details.");
  } finally {
    isLoading.value = false;
  }
}
</script>
