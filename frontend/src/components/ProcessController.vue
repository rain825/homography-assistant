<template>
  <div class="controller-wrapper">
    <div class="button" @click="handleClick">transform</div>
    <div class="button" @click="handleChangeVisible">
      {{ isOverlayImageVisible ? "Hide" : "Show" }}
    </div>
    <input
      type="range"
      value="1.0"
      min="0.0"
      max="1.0"
      step="0.01"
      @input="handleSliderChange"
    />
  </div>
</template>

<script>
export default {
  name: "ProccessController",
  props: {
    isOverlayImageVisible: {
      type: Boolean,
      required: true,
    },
    overlayImageOpacity: {
      type: Number,
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
    handleSliderChange() {
      this.$emit("sliderChange", Number(event.target.value))
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
