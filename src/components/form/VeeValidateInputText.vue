<script lang="ts" setup>
import { Field, ErrorMessage } from "vee-validate";

interface Props {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  type?: string;
  solid?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <label
    class="form-label"
    :class="[{ required: props.required }]"
    >{{ props.label }}</label
  >
  <Field
    :name="props.name"
    v-slot="{ field, meta }"
  >
    <input
      v-bind="field"
      :placeholder="props.placeholder"
      :type="props.type ? props.type : 'text'"
      class="form-control"
      :class="[{ 'form-control-solid': props.solid }, { 'border-danger': meta.touched && !meta.valid }]"
    />
  </Field>
  <ErrorMessage
    :name="props.name"
    class="fv-plugins-message-container text-danger"
  />
</template>
