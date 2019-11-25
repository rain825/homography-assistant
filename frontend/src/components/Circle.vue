<template>
  <div class="circles">
    <v-circle
      v-for="(circle, idx) in circles"
      :key="idx"
      v-bind:config="circle"
      :id="idx"
    ></v-circle>
  </div>
</template>

<script>
export default {
  props: {
    circles: {
      type: Array,
      required: true,
    },
  },
}
</script>
