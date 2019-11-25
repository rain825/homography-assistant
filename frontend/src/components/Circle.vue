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
    handleMouseUp(event) {
      // console.debug(`circle drag:  ${JSON.stringify(event.target.attrs.idx)}`)
      this.$emit("circlemove", {
        idx: event.target.attrs.idx,
        x: event.target.attrs.x,
        y: event.target.attrs.y,
      })
    },
  },
}
</script>
