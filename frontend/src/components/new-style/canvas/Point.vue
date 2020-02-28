<template>
  <v-group :config="groupConfig" @mouseup="handleMouseUp">
    <v-circle :config="circleConfig"> </v-circle>
    <v-text :config="textConfig"></v-text>
  </v-group>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      required: true,
    },
    pos: {
      type: Object,
      required: true,
      validator: pos => "x" in pos && "y" in pos,
    },
    color: {
      type: Object,
      required: true,
      validator: color => "fg" in color && "bg" in color,
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
      baseConfig: {
        circle: {
          scale: {
            x: 1,
            y: 1,
          },
          radius: 12,
          strokeWidth: 3,
        },
        text: {
          fontSize: 15,
        },
      },
    }
  },
  computed: {
    text() {
      return `${this.$vnode.key}`
    },
    scaledCircleConfig() {
      const scale = this.scale || 1.0
      const base = this.baseConfig.circle
      return {
        radius: base.radius * scale,
        strokeWidth: base.strokeWidth * scale,
      }
    },
    scaledTextConfig() {
      const scale = this.scale || 1.0
      const base = this.baseConfig.text

      const scaledRadius = this.scaledCircleConfig.radius

      return {
        fontSize: base.fontSize * scale,
        x: -(scaledRadius * this.text.length * 0.4),
        y: -(scaledRadius * 0.5),
      }
    },
    circleConfig() {
      return {
        ...this.baseConfig.circle,
        ...this.scaledCircleConfig,
        ...this.overrideConfig,
        fill: this.color.bg,
        stroke: this.color.fg,
      }
    },
    groupConfig() {
      return {
        foo: "bar",
        draggable: true,
        ...this.pos,
      }
    },
    textConfig() {
      return {
        text: this.text,
        fill: this.color.fg,
        ...this.scaledTextConfig,
      }
    },
  },
  methods: {
    handleMouseUp(event) {
      const idx = this.idx
      // const { x, y } = event.target.attrs
      const { x, y } = event.currentTarget.position()

      console.debug(event)

      console.log(
        `DragPoint <idx=${idx}, color=${JSON.stringify(
          this.color
        )}, pos=(${x}, ${y})`
      )

      this.$emit("drag", idx, { x, y })
    },
  },
}
</script>
