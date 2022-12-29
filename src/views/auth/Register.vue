<script lang="ts" setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

//  Components
import ButtonSignInGoogleVue from "./components/ButtonSignInGoogle.vue";
import VeeValidateInputTextVue from "@/components/form/VeeValidateInputText.vue";
import VeeValidateInputPasswordVue from "@/components/form/VeeValidateInputPassword.vue";

//  Refs
const isSubmit = ref<boolean>(false);

//  Hooks
const { register } = useFirebaseAuth();
const { handleSubmit, setFieldError } = useForm({
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  }),
});

//  Methods
const submit = handleSubmit((values) => {
  isSubmit.value = true;
  const { email, password } = values;
  register(email, password, setFieldError);
  isSubmit.value = false;
});
</script>

<template>
  <form
    class="form w-100"
    @submit.prevent="submit"
  >
    <div class="text-center mb-11">
      <h1 class="text-dark fw-bolder mb-3">Creá tu cuenta</h1>
      <div class="text-gray-500 fw-semibold fs-6">Ingresá tus datos para registrarte</div>
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
    <div class="fv-row mb-7">
      <VeeValidateInputPasswordVue
        name="confirmPassword"
        placeholder="Ingresá de nuevo la contraseña"
        label="Repetir contraseña"
        :required="true"
        :show-password-btn="true"
        :solid="true"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary w-100 mb-10"
    >
      <span
        class="spinner-border spinner-border-sm align-middle ms-2"
        v-if="isSubmit"
      ></span>
      Registrarse
    </button>
    <div class="text-gray-500 text-center fw-semibold fs-6">
      ¿Ya tenés cuenta?
      <RouterLink
        to="/login"
        class="link-primary"
        >Ingresá acá</RouterLink
      >
    </div>
    <div class="separator separator-content my-14">
      <span class="w-125px text-gray-500 fw-semibold fs-7">O con tus redes sociales</span>
    </div>
    <div class="row g-3 mb-9">
      <ButtonSignInGoogleVue />
    </div>
  </form>
</template>
