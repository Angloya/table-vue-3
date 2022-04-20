<template>
  <div class="container">
    <TableForm @create="createTable"/>

    <div class="row">
      <div :class="$style.content" class="сol-12 col-md-6">
        <template v-if="state.rowData.length">
          <DataTable
              :rowData="clippedData"
              @sort="sort"/>

          <Paginator
              :countOnPage="state.countOnPage"
              :pagesCount="pagesCount"
              @change="changePage"/>

          <button
              class='btn btn-primary mt-4'
              @click="exportTable">
            Экспорт в формате CSV
          </button>
        </template>

        <h2 v-else class="h2">
          Добавьте данные чтобы увидеть таблицу
        </h2>
      </div>

      <DataChart
          v-if="state.rowData.length"
          :rowData="state.rowData"
          :allowedWords="state.allowedWords"
          class="сol-12 col-md-6"/>
    </div>
  </div>
</template>

<script setup>
  import DataTable from '@/components/DataTable.vue';
  import TableForm from '@/components/TableForm.vue';
  import Paginator from '@/components/Paginator.vue';
  import DataChart from '@/components/DataChart.vue';
  import { useCVS } from '@/composables/useCVS';
  import { computed, reactive } from 'vue';

  const state = reactive({
    rowData: [],
    isSortByValue: false,
    countOnPage: 10,
    page: 1,
    allowedWords: [],
  });

  const pagesCount = computed(() => {
    return Math.ceil(state.rowData.length / state.countOnPage);
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
    state.allowedWords = stringWithoutSpaces.split(',');

    for (let i = 0; i < count; i++) {
      const id = data.length + 1;
      const maxIndex = state.allowedWords.length - 1;
      const randomIndex = randomValue(0, maxIndex);

      let row = {
        id,
        name: `name${id}`,
        rand: state.allowedWords[randomIndex]
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

  const changePage = (value) => {
    state.page = value;
  }

  const exportTable = () => {
    const { csv } = useCVS(state.rowData);

    // download file
    let link = document.createElement('a')
    link.id = 'download-csv'
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'file.csv');
    document.body.appendChild(link)
    document.querySelector('#download-csv').click()
  }
</script>

<style module>
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
</style>