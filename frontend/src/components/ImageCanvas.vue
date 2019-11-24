<template>
  <div class="canvas-wrapper">
    <v-stage
      class="stage"
      :style="stageStyle"
      :config="stageConfig"
      @wheel="handleWheel"
      @mousemove="handleMouseMove"
      ref="stage"
    >
      <v-layer :config="layerConfig" ref="layer">
        <v-image
          :config="imgConfig"
          ref="image"
          @mouseenter="handleImageMouseEnter"
          @mouseleave="handleImageMouseLeave"
          @click="handleImageClick"
        ></v-image>
        <v-circle
          v-for="(circle, key, idx) in circles"
          :key="idx"
          v-bind:config="circle"
        ></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { calcScale } from "@/utils/scaling.js"

export default {
  data() {
    return {
      isMounted: false,
      markerScale: 1.0,
      imgConfig: {
        image: this.image,
      },
      isCursorOnImage: false,
      circles: [],
    }
  },
  props: {
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    image: {
      type: HTMLImageElement,
      required: true,
    },
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
      return this.isMounted ? this.$refs.image.getStage() : undefined
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
    layerConfig() {
      const scale = this.calcScaling
      return {
        // width: scale.size.image.native.width,
        // height: scale.size.image.native.height,
        // scale: {
        //   x: scale.ratio,
        //   y: scale.ratio,
        // },
        draggable: true,
      }
    },
    calcScaling() {
      if (this.width !== undefined && this.height !== undefined) {
        if (this.width >= this.height) {
          return calcScale.basedOnWidth(this.width, this.image)
        } else {
          return calcScale.basedOnHeight(this.height, this.image)
        }
      } else {
        if (this.width !== undefined) {
          return calcScale.basedOnWidth(this.width, this.image)
        } else {
          return calcScale.basedOnHeight(this.height, this.image)
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
    handleMouseMove() {
      const cursorPos = this.calCurrentCursorPosInImage()
    },
    handleWheel(event) {
      const scaleBy = 1.2
      event.evt.preventDefault()
      this.cursorCenteredScaling(event.evt.deltaY, scaleBy)

      this.markerScale = 1 / this.kStage.scaleX()

      this.kStage.batchDraw()
    },
    handleImageMouseEnter() {
      this.isCursorOnImage = true
    },
    handleImageMouseLeave() {
      this.isCursorOnImage = false
    },
    handleImageClick() {
      const cursorPos = this.calCurrentCursorPosInImage()
      this.circles.push(this.getCircleConfig(cursorPos))
    },
    getCircleConfig(pos) {
      return {
        x: pos.x,
        y: pos.y,
        scale: {
          x: 1,
          y: 1,
        },
        radius: 15,
        fill: "red",
        stroke: "black",
        strokeWidth: 3,
        draggable: true,
      }
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
  },
}
</script>

<style scoped>
.canvas-wrapper {
  position: relative;
}
</style>
