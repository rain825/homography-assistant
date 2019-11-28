<template>
  <div class="controller-wrapper">
    <div class="button" @click="handleClick">transform</div>
  </div>
</template>

<script>
export default {
  name: "ProccessController",
  methods: {
    handleClick() {
      this.$emit("send")
    },
  },
}
</script>

<style scoped>
.controller-wrapper {
  margin: 0px 16px;
}
.controller-wrapper .button {
  padding: 8px;
  color: white;
  background-color: blue;
}
.controller-wrapper .button:hover {
  background-color: #333;
}
</style>
