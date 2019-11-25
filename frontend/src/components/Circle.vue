<template>
  <div class="circles">
    <v-circle
      v-for="(circle, idx) in circles"
      :key="idx"
      v-bind:config="circle"
      :idx="idx"
      @mouseup="handleMouseUp"
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
  mounted() {},
  methods: {
    handleMouseUp(e) {
      console.debug(`mouse up:  ${JSON.stringify(e.target.attrs.idx)}`)
    },
  },
}
</script>
