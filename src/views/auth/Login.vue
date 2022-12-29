<script lang="ts" setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

//  Components
import ButtonSignInGoogleVue from "./components/ButtonSignInGoogle.vue";
import VeeValidateInputTextVue from "@/components/form/VeeValidateInputText.vue";
import VeeValidateInputPasswordVue from "@/components/form/VeeValidateInputPassword.vue";

//  Refs
const isSubmit = ref<boolean>(false);

//  Hooks
const { login } = useFirebaseAuth();
const { handleSubmit, setFieldError } = useForm({
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
});

//  Methods
const submit = handleSubmit((values) => {
  isSubmit.value = true;
  const { email, password } = values;
  login(email, password, setFieldError);
  isSubmit.value = false;
});
</script>

<template>
  <form
    class="form w-100"
    @submit.prevent="submit"
  >
    <div class="text-center mb-11">
      <h1 class="text-dark fw-bolder mb-3">Bienvenido</h1>
      <div class="text-gray-500 fw-semibold fs-6">Ingresá con tus redes sociales</div>
    </div>
    <div class="row g-3 mb-9">
      <ButtonSignInGoogleVue />
    </div>
    <div class="separator separator-content my-14">
      <span class="w-125px text-gray-500 fw-semibold fs-7">O con tu email</span>
    </div>
    <div class="fv-row mb-7">
      <VeeValidateInputTextVue
        name="email"
        placeholder="Ingresá tu email"
        label="Correo electrónico"
        :required="true"
        type="email"
        :solid="true"
      />
    </div>
    <div class="fv-row mb-7">
      <VeeValidateInputPasswordVue
        name="password"
        placeholder="Ingresá tu contraseña"
        label="Contraseña"
        :required="true"
        :show-password-btn="true"
        :solid="true"
      />
    </div>
    <div class="text-center fs-base fw-semibold mb-8">
      <RouterLink
        to="/forgot-password"
        class="link-primary"
        >¿Olvidaste tu contraseña?</RouterLink
      >
    </div>
    <button
      type="submit"
      class="btn btn-primary w-100 mb-10"
    >
      <span
        class="spinner-border spinner-border-sm align-middle ms-2"
        v-if="isSubmit"
      ></span>
      Ingresar
    </button>
    <div class="text-gray-500 text-center fw-semibold fs-6">
      ¿No tenés cuenta?
      <RouterLink
        to="/register"
        class="link-primary"
        >Registrate acá</RouterLink
      >
    </div>
  </form>
</template>
