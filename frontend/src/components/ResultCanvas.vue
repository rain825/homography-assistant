<template>
  <div id="result-canvas" class="result-canvas">
    <v-stage
      class="stage"
      :style="stageStyle"
      :config="stageConfig"
      @wheel="handleWheelOnCanvas"
      ref="stage"
    >
      <v-layer :config="layerConfig" ref="layer">
        <v-image
          :config="baseImageConfig"
          ref="baseImage"
          @mouseenter="handleMouseEnterOnImage"
          @mouseleave="handleMouseLeaveOnImage"
        ></v-image>
        <v-image
          :config="overlayImageConfig"
          ref="overlayImage"
          @mouseenter="handleMouseEnterOnImage"
          @mouseleave="handleMouseLeaveOnImage"
        ></v-image>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { calcScale } from "@/utils/scaling.js"

export default {
  name: "ImageCanvas",
  components: {},
  props: {
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    overlayImage: {
      type: HTMLImageElement,
      required: true,
    },
    baseImage: {
      type: HTMLImageElement,
      required: true,
    },
    isOverlayImageVisible: {
      type: Boolean,
      required: true,
    },
    overlayImageOpacity: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isMounted: false,
      layerConfig: {
        draggable: true,
      },
      isCursorOnImage: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    kStage() {
      return this.isMounted ? this.$refs.stage.getStage() : undefined
    },
    kLayer() {
      return this.isMounted ? this.$refs.layer.getStage() : undefined
    },
    kImage() {
      return this.isMounted ? this.$refs.baseImage.getStage() : undefined
    },
    stageConfig() {
      const scale = this.calcScaling
      return {
        width: scale.size.canvas.width,
        height: scale.size.canvas.height,
        scale: {
          x: scale.ratio,
          y: scale.ratio,
        },
      }
    },
    calcScaling() {
      if (this.width !== undefined && this.height !== undefined) {
        if (this.width >= this.height) {
          return calcScale.basedOnWidth(this.width, this.baseImage)
        } else {
          return calcScale.basedOnHeight(this.height, this.baseImage)
        }
      } else {
        if (this.width !== undefined) {
          return calcScale.basedOnWidth(this.width, this.baseImage)
        } else {
          return calcScale.basedOnHeight(this.height, this.baseImage)
        }
      }
    },
    stageStyle() {
      const scale = this.calcScaling
      return {
        width: `${parseInt(scale.size.canvas.width)}px`,
        height: `${parseInt(scale.size.canvas.height)}px`,
      }
    },
    overlayImageConfig() {
      return {
        image: this.overlayImage,
        visible: this.isOverlayImageVisible,
        opacity: this.overlayImageOpacity,
      }
    },
    baseImageConfig() {
      return {
        image: this.baseImage,
      }
    },
  },
  methods: {
    cursorCenteredScaling(wheelDelta, scaleBy) {
      const prevScale = this.kStage.scaleX()
      const prevCursor = this.kStage.getPointerPosition()
      const prevPosition = this.kStage.position()

      const mousePointTo = {
        x: prevCursor.x / prevScale - prevPosition.x / prevScale,
        y: prevCursor.y / prevScale - prevPosition.y / prevScale,
      }

      const newScale =
        wheelDelta > 0 ? prevScale * scaleBy : prevScale / scaleBy

      this.kStage.scale({ x: newScale, y: newScale })

      const newCursor = this.kStage.getPointerPosition()

      var newPos = {
        x: -(mousePointTo.x - newCursor.x / newScale) * newScale,
        y: -(mousePointTo.y - newCursor.y / newScale) * newScale,
      }
      this.kStage.position(newPos)
    },
    calCurrentCursorPosInImage() {
      const cursorPos = this.kStage.getPointerPosition()
      const stagePos = this.kStage.position()
      const layerPos = this.kLayer.position()
      const layerScale = this.kLayer.scale()
      const stageScale = this.kStage.scale()

      const scale = {
        x: layerScale.x / stageScale.x,
        y: layerScale.y / stageScale.y,
      }

      const fixedLayerPos = {
        x: stagePos.x / stageScale.x + layerPos.x / layerScale.x,
        y: stagePos.y / stageScale.y + layerPos.y / layerScale.y,
      }

      const fixedCursorPos = {
        x: cursorPos.x * scale.x - fixedLayerPos.x,
        y: cursorPos.y * scale.y - fixedLayerPos.y,
      }

      return fixedCursorPos
    },
    handleWheelOnCanvas(event) {
      const scaleBy = 1.2
      event.evt.preventDefault()
      this.cursorCenteredScaling(event.evt.deltaY, scaleBy)

      this.kStage.batchDraw()
    },
    handleMouseEnterOnImage() {
      this.isCursorOnImage = true
    },
    handleMouseLeaveOnImage() {
      this.isCursorOnImage = false
    },
  },
}
</script>

<style scoped>
.result-canvas {
  width: 100%;
  position: relative;
}
</style>
