<template>
  <div class="image-canvas">
    <scalable-stage :scale="scale" @scaling="handleScaleChange" ref="stage">
      <v-image
        :config="imgConfig"
        ref="image"
        @mouseenter="handleMouseEnterOnImage"
        @mouseleave="handleMouseLeaveOnImage"
        @click="handleImageClick"
      ></v-image>

      <point
        v-for="(point, index) in points"
        :idx="index"
        :key="point.id"
        :pos="point.pos"
        :color="point.color"
        :scale="1 / pointScale"
        @drag="handleDragOnPoint"
      ></point>
    </scalable-stage>
  </div>
</template>

<script>
import { calcScaling } from "@/utils/scaling.js"
import { pointsValidator } from "@/utils/validator"

import Point from "@/components/canvas/Point.vue"
import ScalableStage from "@/components/canvas/ScalableStage.vue"

export default {
  name: "ImageCanvas",
  components: {
    ScalableStage,
    Point,
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
    points: {
      type: Array,
      required: false,
      validator: pointsValidator,
    },
  },
  data() {
    return {
      isCursorOnImage: false,
      isMounted: false,
      imgConfig: {
        image: this.image,
      },
      layerConfig: {
        draggable: true,
      },
      pointScale: 1.0,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    scale() {
      return calcScaling({
        width: this.width,
        height: this.height,
        image: this.image,
      })
    },
    konva() {
      return this.isMounted ? this.$refs.stage.konva : undefined
    },
  },
  methods: {
    cursorPosInImage() {
      console.log("cursorPosInImage")
      const { stage, layer } = this.konva

      const cursorPos = stage.getPointerPosition()
      console.debug(`cursorPos: ${JSON.stringify(cursorPos)}`)
      const stagePos = stage.position()
      const layerPos = layer.position()
      const layerScale = layer.scale()
      const stageScale = stage.scale()

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
    handleMouseEnterOnImage() {
      this.isCursorOnImage = true
    },
    handleMouseLeaveOnImage() {
      this.isCursorOnImage = false
    },
    handleImageClick() {
      const cursorPos = this.cursorPosInImage()

      console.debug(
        `handleImageClick@ImageCanvas <cursorPos=${JSON.stringify(cursorPos)}>`
      )
      this.$emit("add-point", cursorPos)
    },
    handleDragOnPoint(idx, newPos) {
      console.debug(
        `handleDragOnPoint@ImageCanvas <idx=${idx}, newPos=(${newPos.x}, ${newPos.y})>`
      )
      this.$emit("drag-point", idx, newPos)
    },
    handleScaleChange(newScale) {
      this.pointScale = newScale
    },
  },
}
</script>

<style scoped>
.image-canvas {
  position: relative;
}
</style>
