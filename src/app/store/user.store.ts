import { computed, ref } from "vue";
import type { User } from "firebase/auth";
import { defineStore } from "pinia";

export default defineStore("user", () => {
  //  Refs
  const user = ref<User | null>(null);

  //  Computed
  const getUser = computed((): User | null => user.value);

  return {
    user,
    getUser,
  };
});
