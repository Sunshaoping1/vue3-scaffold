<template>
  <form @submit="onSubmit">
    <div>
      <input type="text" v-model="usernameValue" /> <span>{{ usernameError }}</span>
    </div>
    <div>
      <input type="text" v-model="passValue" /> <span>{{ passError }}</span>
    </div>
    <button>submit</button>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit } = useForm({
  initialValues: {
    username: "hello",
  },
  validationSchema: {
    username: "required|email",
    password: yup.string().required().min(7),
  },
});
const { value: usernameValue, errorMessage: usernameError } = useField(
  "username",
  undefined,
  { label: "用户名" }
);
const { value: passValue, errorMessage: passError } = useField("password", undefined, {
  label: "密码",
});

const onSubmit = handleSubmit((values) => {
  console.log(values, "values");
  alert("验证通过hhhhg");
});

// const onSubmit = (event) => {
//   //该参数是$event事件
//   console.log(event);
//   alert("验证通过");
// };
</script>

<style scoped lang="scss">
form {
  @apply flex flex-col justify-center items-center w-[500px];
  input {
    @apply border border-violet-600 w-[200px] mb-3;
  }
  span {
    position: absolute;
  }
  button {
    @apply border font-light leading-6 w-12;
  }
}
</style>
