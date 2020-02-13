<template>
  <v-stage
    :config="stage.config"
    :style="stage.style"
    @wheel="handleWheel"
    class="stage"
    ref="stage"
  >
    <v-layer :config="layerConfig" ref="layer">
      <slot></slot>
    </v-layer>
  </v-stage>
</template>

<script>
import { scalableStageConfigValidator } from "@/utils/validator.js"
export default {
  name: "ScalableStage",
  props: {
    config: {
      type: Object,
      required: true,
      validator: scalableStageConfigValidator,
    },
  },
  data() {
    return {
      isMounted: false,
      scrollScale: 1.2,
      layerConfig: {
        draggable: true,
      },
      stageScale: null,
    }
  },
  created() {
    this.stageScale = this.config.scale
  },
  mounted() {
    this.isMounted = true
    this.$emit("scaling", this.stageScale)
    window.addEventListener("resize", () => {
      this.konva.stage.size({
        width: this.$parent.$el.clientWidth,
        height: this.$parent.$el.clientHeight,
      })
    })
  },
  computed: {
    stage() {
      const config = this.config

      return {
        style: {
          width: `${parseInt(config.width)}px`,
          height: `${parseInt(config.height)}px`,
        },
        config: {
          ...config,
          scale: this.stageScale,
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

      const newPos = {
        x: -(mousePointTo.x - newCursor.x / newScale) * newScale,
        y: -(mousePointTo.y - newCursor.y / newScale) * newScale,
      }
      stage.position(newPos)
    },
    handleWheel(event) {
      event.evt.preventDefault()

      this.cursorCenteredScaling(event.evt.deltaY, this.scrollScale)

      this.stageScale = this.konva.stage.scale()
      this.$emit("scaling", this.stageScale)

      this.$nextTick(() => {
        this.konva.stage.batchDraw()
      })
    },
  },
}
</script>
