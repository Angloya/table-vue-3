<template>
  <div class="text-center">
    <component :is="chartComponent" :chartData="chartData"/>
    <button
        class='btn btn-primary mt-4'
        @click="changeChart">
      изменить вид диаграммы
    </button>
  </div>
</template>

<script setup>
  import { BarChart, PieChart } from "vue-chart-3";
  import { Chart, registerables } from "chart.js";
  import { computed, ref, defineProps } from 'vue';

  const props = defineProps({
    allowedWords: Array,
    rowData: Array,
  });

  Chart.register(...registerables);

  const isBarChart = ref(false);

  const chartValues = computed(() => {
    const values = [];

    props.allowedWords.forEach((word) => {
      const filteredArray = props.rowData.filter((item) => item.rand === word);
      values.push(filteredArray.length);
    });

    return values;
  });

  const chartComponent = computed(() => isBarChart.value ? BarChart : PieChart);

  const chartData = computed(() => ({
    labels: props.allowedWords,
    datasets: [
      {
        label: 'Данные из таблицы',
        data: chartValues.value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  }));

  const changeChart = () => {
    isBarChart.value = !isBarChart.value;
  }
</script>
