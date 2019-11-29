<template>
  <div class="controller-wrapper">
    <div class="button" @click="handleClick">transform</div>
    <div class="button" @click="handleChangeVisible">
      {{ isResultImageVisible ? "Hide" : "Show" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProccessController",
  props: {
    isResultImageVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("send")
    },
    handleChangeVisible() {
      this.$emit("changeVisible")
    },
  },
}
</script>

<style scoped>
.controller-wrapper {
  margin: 0px 16px;
  display: flex;
  flex-direction: row;
}
.controller-wrapper .button {
  padding: 8px;
  color: white;
  background-color: blue;
  margin: 8px;
}
.controller-wrapper .button:hover {
  background-color: #333;
}
</style>
