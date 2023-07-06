<template>
  <div>
    <Form @submit="onSumbit">
      hd:
      <Field
        name="account"
        label="账户"
        rules="required|email"
        :validate-on-input="true"
        #default="{ field, errorMessage, value }"
      >
        {{ field }}
        {{ value }}
        <input v-bind="field" class="border border-red-400" />
        {{ errorMessage }}
      </Field>
      <hr />
      <button>sumbit</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { ref } from "vue";

// const account = ref<string>("");
const onSumbit = (values) => {
  console.log(values);
  alert("yanzhengtonggou");
};

// const emailRule = (val) => {
//   return /@/.test(val) ? true : "邮箱格式错误";
// };
</script>

<style scoped></style>
