<template>
  <div class="controller-wrapper">
    <div class="button" @click="handleClick">transform</div>
    <div class="button" @click="handleChangeVisible">
      {{ this.values.overlayImage.visible ? "Hide" : "Show" }}
    </div>
    <input
      type="range"
      v-bind="opacitySlider"
      v-model="opacitySlider.value"
      @input="handleSliderChange"
    />
  </div>
</template>

<script>
export default {
  name: "ProccessController",
  model: {
    prop: "values",
    event: "change",
  },
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      opacitySlider: {
        value: 1.0,
        min: 0.0,
        max: 1.0,
        step: 0.01,
      },
    }
  },
  methods: {
    handleClick() {
      this.$emit("send")
    },
    handleChangeVisible() {
      this.$emit("change", {
        ...this.values,
        overlayImage: {
          ...this.values.overlayImage,
          visible: !this.values.overlayImage.visible,
        },
      })
    },
    handleSliderChange(event) {
      this.$emit("change", {
        ...this.values,
        overlayImage: {
          ...this.values.overlayImage,
          opacity: Number(event.target.value),
        },
      })
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
