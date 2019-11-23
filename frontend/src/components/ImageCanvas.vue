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
        ></v-image>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMounted: false,
      imgConfig: {
        image: this.image,
      },
      isCursorOnImage: false,
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
      const scale = this.scaling
      return {
        width: scale.size.canvas.width,
        height: scale.size.canvas.height,
        scale: { x: 1, y: 1 },
      }
    },
    layerConfig() {
      const scale = this.scaling
      return {
        width: scale.size.image.native.width,
        height: scale.size.image.native.height,
        scale: {
          x: scale.ratio,
          y: scale.ratio,
        },
        draggable: true,
      }
    },
    scaling() {
      const basedOnWidth = (width, image) => {
        const ratio = width / image.naturalWidth
        console.log(`Ratio: ${ratio}`)
        return {
          ratio: ratio,
          size: {
            image: {
              native: {
                width: image.naturalWidth,
                height: image.naturalHeight,
              },
              scaled: {
                x: image.naturalWidth * ratio,
                y: image.naturalHeight * ratio,
              },
            },
            canvas: {
              width: width,
              height: image.naturalHeight * ratio,
            },
          },
        }
      }
      const basedOnHeight = (height, image) => {
        const ratio = height / image.naturalHeight
        console.log(`Ratio: ${ratio}`)
        return {
          ratio: ratio,
          size: {
            image: {
              native: {
                width: image.naturalWidth,
                height: image.naturalHeight,
              },
              scaled: {
                x: image.naturalWidth * ratio,
                y: image.naturalHeight * ratio,
              },
            },
            canvas: {
              width: image.naturalWidth * ratio,
              height: height,
            },
          },
        }
      }

      if (this.width !== undefined && this.height !== undefined) {
        if (this.width >= this.height) {
          return basedOnWidth(this.width, this.image)
        } else {
          return basedOnHeight(this.height, this.image)
        }
      } else {
        if (this.width !== undefined) {
          return basedOnWidth(this.width, this.image)
        } else {
          return basedOnHeight(this.height, this.image)
        }
      }
    },
    stageStyle() {
      const scale = this.scaling
      return {
        width: `${parseInt(scale.size.canvas.width)}px`,
        height: `${parseInt(scale.size.canvas.height)}px`,
      }
    },
  },
  methods: {
    handleMouseMove() {
      const cursorPos = this.kStage.getPointerPosition()
      const stagePos = this.kStage.position()
      const layerPos = this.kLayer.position()
      const layerScale = this.kLayer.scaleX()

      const fixedLayerPos = {
        x: stagePos.x + layerPos.x,
        y: stagePos.y + layerPos.y,
      }

      const pos = {
        x: (cursorPos.x - fixedLayerPos.x) / layerScale,
        y: (cursorPos.y - fixedLayerPos.y) / layerScale,
      }

      // const scaledPos = {
      //   x: pos.x / layerScale, // stageScale,
      //   y: pos.y / layerScale, // stageScale,
      // }

      console.debug(`pos: ${JSON.stringify(pos)}`)
    },
    handleWheel(event) {
      const scaleBy = 1.2
      const deltaY = event.evt.deltaY

      // const prevScale = this.kStage.scaleX()
      const prevScale = this.kLayer.scaleX()
      const prevCursor = this.kStage.getPointerPosition()
      const prevPosition = this.kStage.position()
      event.evt.preventDefault()

      const mousePointTo = {
        x: prevCursor.x / prevScale - prevPosition.x / prevScale,
        y: prevCursor.y / prevScale - prevPosition.y / prevScale,
      }

      const newScale = deltaY > 0 ? prevScale * scaleBy : prevScale / scaleBy

      // this.kStage.scale({ x: newScale, y: newScale })
      this.kLayer.scale({ x: newScale, y: newScale })

      const newCursor = this.kStage.getPointerPosition()

      var newPos = {
        x: -(mousePointTo.x - newCursor.x / newScale) * newScale,
        y: -(mousePointTo.y - newCursor.y / newScale) * newScale,
      }
      this.kStage.position(newPos)
      this.kStage.batchDraw()
    },
    handleImageMouseEnter() {
      this.isCursorOnImage = true
    },
    handleImageMouseLeave() {
      this.isCursorOnImage = false
    },
  },
}
</script>

<style scoped>
.canvas-wrapper {
  position: relative;
}
</style>
