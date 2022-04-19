<template>
  <div class="container">
    <TableForm @create="createTable"/>

    <div class="row">
      <div :class="$style.content" class="сol-12 col-md-6">
        <DataTable
            v-if="clippedData.length"
            :rowData="clippedData"
            @sort="sort"/>

        <div v-else>
          Добавьте данные чтобы увидеть таблицу
        </div>

        <Paginator
            v-if="state.rowData.length"
            :countOnPage="state.countOnPage"
            :pagesCount="pagesCount"
            @change="changePage"/>
      </div>

      <div v-if="state.rowData.length" :class="$style.content" class="сol-12 col-md-6">
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTable from '@/components/DataTable.vue'
  import TableForm from '@/components/TableForm.vue';
  import Paginator from '@/components/Paginator.vue';

  import { computed, reactive } from 'vue'

  const state = reactive({
    rowData: [],
    isSortByValue: false,
    countOnPage: 10,
    page: 1,
  })

  const pagesCount = computed(() => {
    return Math.round(state.rowData.length / state.countOnPage);
  })

  const clippedData = computed(() => {
    return state.rowData.slice(state.countOnPage * (state.page - 1), state.countOnPage * state.page);
  })

  const randomValue = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const createTable = ({ count, countOnPage, words }) => {
    const data = [];
    state.countOnPage = countOnPage;
    const stringWithoutSpaces = words.replace(/\s+/g, '');
    const allowedWords = stringWithoutSpaces.split(',')

    for (let i = 0; i < count; i++) {
      const id = data.length + 1;
      const maxIndex = allowedWords.length - 1;
      const randomIndex = randomValue(0, maxIndex);

      let row = {
        id,
        name: `name${id}`,
        rand: allowedWords[randomIndex]
      };
      data.push(row);
    }

    state.rowData = data;
  }

  const sort = (fieldName) => {
    state.isSortByValue = !state.isSortByValue;

    state.rowData.sort((a, b) => {
      if (state.isSortByValue) {
        return b[fieldName] - a[fieldName];
      } else {
        return a[fieldName] - b[fieldName];
      }
    })
  }

  const changePage = (value) =>{
    state.page = value;
  }
</script>

<style module>
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
</style>