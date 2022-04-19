<template>
  <div :class="$style.pagination">
    <button
        class='btn btn-primary'
        :disabled="page === 1"
        @click="previousPage">
      назад
    </button>

    {{page}} из {{props.pagesCount}}

    <button
        class='btn btn-primary'
        :disabled="page === props.pagesCount"
        @click="nextPage">
      вперед
    </button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const emit = defineEmits(['change'])

  const props = defineProps({
    pagesCount: Number,
  })

  const page = ref(1);

  const previousPage = () => {
    page.value--;
    emit('change', page.value);
  }

  const nextPage = () => {
    page.value++;
    emit('change', page.value);
  }
</script>

<style module>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 12px;
  }
</style>
