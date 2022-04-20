<template>
  <table :class="$style.table" class="table table-striped">
    <caption align="top" :class="$style.title">
      Данные
    </caption>

    <tr :class="$style.header">
      <th :class="$style.column">
        <div :class="$style.header__item">
          id
          <img
              :class="$style.header__icon"
              alt="сортировка"
              src="@/assets/arrow.png"
              height="16"
              width="16"
              @click="emit('sort', 'id')"
          >
        </div>
      </th>

      <th :class="$style.column">
        <div :class="$style.header__item">
          name
        </div>
      </th>

      <th :class="$style.column">
        <div :class="$style.header__item">
          rand
        </div>
      </th>
    </tr>

    <tbody>
      <tr
          v-for="(item, id) in props.rowData"
          :key="id"
          :class="$style.row">
        <td :class="$style.column">
          {{item.id}}
        </td>

        <td :class="$style.column">
          {{item.name}}
        </td>

        <td :class="$style.column">
          {{item.rand}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const emit = defineEmits(['sort']);

  const props = defineProps({
    rowData: Array,
  });
</script>

<style module>
  .table {
    min-width: 320px;
  }

  .title {
    margin-bottom: 12px;
    font-weight: 700;
  }

  .header__item  {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__icon {
    cursor: pointer;
  }
</style>
