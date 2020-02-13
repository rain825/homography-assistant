<template>
  <div class="toolbar-wrapper">
    <div class="button" @click="handleTransform">Transform</div>
    <div
      :class="{ button: true, disabled: !available }"
      @click="handleChangeVisible"
    >
      {{ this.values.overlayImage.visible ? "Hide" : "Show" }}
    </div>
    <div :class="{ button: true, disabled: !available }" @click="handleExport">
      Export
    </div>
    <input
      type="range"
      v-bind="opacitySlider"
      v-model="opacitySlider.value"
      :disabled="!available"
      @input="handleSliderChange"
    />
  </div>
</template>

<script>
export default {
  name: "Toolbar",
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
  computed: {
    available() {
      return (
        this.values.overlayImage.image !== null ||
        this.values.baseImage.image !== null
      )
    },
  },
  methods: {
    handleTransform() {
      this.$emit("send")
    },
    handleExport() {
      this.$emit("show-modal")
    },
    handleChangeVisible() {
      if (!this.available) return

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
.toolbar-wrapper {
  margin: 0px 16px;
  display: flex;
  flex-direction: row;
}
.toolbar-wrapper .button {
  width: 100px;
  text-align: center;
  padding: 8px;
  color: white;
  background-color: rgba(32, 32, 255, 0.8);
  border: 3px solid rgb(4, 4, 64);
  margin: 8px;
  cursor: pointer;
  font-weight: bold;
}
.toolbar-wrapper .button:not(.disabled):hover {
  background-color: #333;
}
.toolbar-wrapper .button.disabled {
  font-weight: normal;
  background-color: #333;
  color: #aaa;
  cursor: default;
}
</style>
