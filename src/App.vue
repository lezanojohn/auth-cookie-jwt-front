<template>
  <v-app>
    <v-app-bar v-if="isLoggedIn" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Auth Cookie + JWT</v-app-bar-title>

      <template v-slot:append>
        <v-btn text="Cerrar Sesión" @click="isLoggedIn = false"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <full-screen-loading v-if="isLoading" />
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "./store/authStore";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import FullScreenLoading from "./components/FullScreenLoading.vue";

const router = useRouter();

const authStore = useAuthStore();
const { isLoggedIn, isLoading } = storeToRefs(authStore);

const handleValidateSession = async () => {
  isLoading.value = true;
  try {
    await authStore.validateSession();
    router.push("/home");
  } catch (error) {
    console.error(error);
    router.push("/");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => handleValidateSession());

watch(isLoggedIn, async (logginIn) => {
  if (!logginIn) {
    isLoading.value = true;
    try {
      await authStore.logOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
