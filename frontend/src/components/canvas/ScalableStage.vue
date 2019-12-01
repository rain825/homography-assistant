<template>
  <v-stage
    class="stage"
    :style="stage.style"
    :config="stage.config"
    @wheel="handleWheel"
    ref="stage"
  >
    <v-layer :config="layerConfig" ref="layer">
      <slot></slot>
    </v-layer>
  </v-stage>
</template>

<script>
import { scalingValidator } from "@/utils/validator.js"
export default {
  name: "ScalableStage",
  props: {
    scale: {
      type: Object,
      required: true,
      validator: scalingValidator,
    },
  },
  data() {
    return {
      isMounted: false,
      layerConfig: {
        draggable: true,
      },
      scrollScale: 1.2,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    stage() {
      const scale = this.scale

      return {
        style: {
          width: `${parseInt(scale.size.canvas.width)}px`,
          height: `${parseInt(scale.size.canvas.height)}px`,
        },
        config: {
          width: scale.size.canvas.width,
          height: scale.size.canvas.height,
          scale: {
            x: scale.ratio,
            y: scale.ratio,
          },
        },
      }
    },
    konva() {
      return this.isMounted
        ? {
            stage: this.$refs.stage.getStage(),
            layer: this.$refs.layer.getStage(),
          }
        : undefined
    },
  },
  methods: {
    cursorCenteredScaling(wheelDelta, scrollScale) {
      const stage = this.konva.stage
      const prevScale = stage.scaleX()
      const prevCursor = stage.getPointerPosition()
      const prevPosition = stage.position()

      const mousePointTo = {
        x: prevCursor.x / prevScale - prevPosition.x / prevScale,
        y: prevCursor.y / prevScale - prevPosition.y / prevScale,
      }

      const newScale =
        wheelDelta > 0 ? prevScale * scrollScale : prevScale / scrollScale

      stage.scale({ x: newScale, y: newScale })

      const newCursor = stage.getPointerPosition()

      var newPos = {
        x: -(mousePointTo.x - newCursor.x / newScale) * newScale,
        y: -(mousePointTo.y - newCursor.y / newScale) * newScale,
      }
      stage.position(newPos)
    },
    handleWheel(event) {
      event.evt.preventDefault()
      this.cursorCenteredScaling(event.evt.deltaY, this.scrollScale)

      this.$nextTick(() => this.konva.stage.batchDraw())
    },
  },
}
</script>
