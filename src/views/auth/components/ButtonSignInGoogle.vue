<script lang="ts" setup>
import { ref } from "vue";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

//  Hooks
const { signInWithGoogle } = useFirebaseAuth();

//  Refs
const isLoading = ref<boolean>(false);

//  Methods
async function submit() {
  isLoading.value = true;
  await signInWithGoogle();
  isLoading.value = false;
}
</script>

<template>
  <button
    type="button"
    class="btn btn-google"
    @click.prevent="submit"
  >
    <span
      class="spinner-border spinner-border-sm align-middle me-2"
      v-if="isLoading"
    ></span>
    <i class="fa-brands fa-google me-2"></i>
    Continuar con Google
  </button>
</template>
