<template>
  <div>
    <template v-if="props.errors.length">
      <div
          :class="$style.errors"
          v-for="error of props.errors"
          :key="error.$uid">
        <div :class="$style.error">{{ error.$message }}</div>
      </div>
    </template>

    <template v-else>
      <div :class="$style.errors"/>
    </template>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    errors: Array,
  })
</script>

<style module>
  .errors {
    height: 32px;
    margin-top: 8px;
    color: red;
  }
</style>
