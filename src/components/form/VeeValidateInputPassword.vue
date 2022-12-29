<script lang="ts" setup>
import { ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";

interface Props {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  showPasswordBtn: boolean;
  solid?: boolean;
}

const props = defineProps<Props>();

const isPassword = ref<boolean>(true);
</script>

<template>
  <div class="d-flex justify-content-between">
    <label
      class="form-label"
      :class="[{ required: props.required }]"
      >{{ props.label }}</label
    >
    <button
      type="button"
      class="btn btn-text-primary p-0"
      @click="isPassword = !isPassword"
    >
      {{ isPassword ? "Mostrar" : "Ocultar" }}
    </button>
  </div>
  <Field
    :name="props.name"
    v-slot="{ field, meta }"
  >
    <input
      v-bind="field"
      :type="isPassword ? 'password' : 'text'"
      :placeholder="props.placeholder"
      class="form-control"
      :class="[{ 'form-control-solid': props.solid }, { 'border-danger': meta.touched && !meta.valid }]"
    />
  </Field>
  <ErrorMessage
    :name="props.name"
    class="fv-plugins-message-container text-danger"
  />
</template>
