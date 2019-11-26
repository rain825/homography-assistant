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
        radius: 15,
        stroke: "black",
        strokeWidth: 3,
        draggable: true,
      },
    }
  },
  computed: {
    config() {
      return {
        ...this.commonConfig,
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
