
<template>
  <form :class="$style.form" @submit.prevent>
      <div :class="$style.inputWrapper">
        <label for="count">Кол-во записей</label>
        <input
            v-model="v$.count.$model"
            :class="$style.input"
            id="count"
            name="count"
            class="form-control"
            type="number"/>

        <UIError :errors="v$.count.$errors"/>
      </div>

      <div :class="$style.inputWrapper">
        <label for="countOnPage">Кол-во на страницу</label>
        <input
            v-model="v$.countOnPage.$model"
            :class="$style.input"
            id="countOnPage"
            name="countOnPage"
            class="form-control"
            type="number"
            required/>

        <UIError :errors="v$.countOnPage.$errors"/>
      </div>

      <div :class="$style.inputWrapper">
        <label for="words">Используемые слова</label>
        <input
            v-model="v$.words.$model"
            :class="$style.input"
            id="words"
            name="words"
            class="form-control"
            required/>

        <UIError :errors="v$.words.$errors"/>
      </div>

    <button
        :disabled="v$.$invalid"
        :class="$style.submitButton"
        class='btn btn-primary'
        @click="onSubmit">
      Применить
    </button>

    <button class='btn btn-dark' @click="onDeclined">Сбросить</button>
  </form>
</template>

  <script setup>
  import UIError from '@/components/UIError.vue';
  import useVuelidate from '@vuelidate/core'
  import { required, numeric } from '@vuelidate/validators'
  import { defineEmits, reactive } from 'vue'

  const emit = defineEmits(['create']);

  const state = reactive({
    count: '',
    words: '',
    countOnPage: '',
  });

  const onlyTextWithComma = (value) => /^[a-zA-Z-а-яА-ЯёЁ-\s,]*$/i.test(value);

  const rules = {
    count: { required, numeric },
    words: {
      required,
      text_validation: {
        $validator: onlyTextWithComma,
        $message: 'Вы можете вводить только буквы, запятую и пробел'
      }
    },
    countOnPage: { required, numeric },
  }

  const v$ = useVuelidate(rules, state, { $lazy: true })

  const onSubmit = async () => {
    await v$.value.$validate()

    if (v$.value.$invalid) {
      return
    }

    emit('create', {
      count: state.count,
      words: state.words,
      countOnPage: state.countOnPage,
    });

    onDeclined();
  }

  const onDeclined = () => {
    v$.value.$reset();

    state.count = '';
    state.words = '';
    state.countOnPage = '';
  }
</script>

<style module>
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .inputWrapper {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 12px 12px 0 0;
  }

  .input {
    padding: 10px;
    margin-right: 16px;
  }

  .submitButton {
    margin-right: 12px;
  }
</style>
