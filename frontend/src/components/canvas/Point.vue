<template>
  <v-circle :config="config" @mouseup="handleMouseUp"></v-circle>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
      validator: value => {
        if (typeof value == "string") {
          value = parseInt(value)
        }
        return Number.isInteger(value)
      },
    },
    pos: {
      type: Object,
      required: true,
      validator: value => "x" in value && "y" in value,
    },
    color: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      required: false,
    },
    overrideConfig: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      commonConfig: {
        scale: {
          x: 1,
          y: 1,
        },
        radius: 10,
        stroke: "black",
        strokeWidth: 3,
        draggable: true,
      },
    }
  },
  computed: {
    scaledRadius() {
      const scale = this.scale || 1.0
      const base = this.commonConfig
      return {
        radius: base.radius * scale,
        strokeWidth: base.strokeWidth * scale,
      }
    },
    config() {
      return {
        ...this.commonConfig,
        ...this.scaledRadius,
        ...this.overrideConfig,
        ...this.pos,
        fill: this.color,
      }
    },
  },
  methods: {
    handleMouseUp(event) {
      const id = this.id
      const { x, y } = event.target.attrs
      this.$emit("drag", id, { x, y })
    },
  },
}
</script>
