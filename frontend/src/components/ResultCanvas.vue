<template>
  <div id="result-canvas" class="result-canvas">
    <scalable-stage :scale="scale">
      <v-image
        id="base-image"
        :config="config.baseImage"
        ref="baseImage"
      ></v-image>
      <v-image
        id="overlay-image"
        :config="config.overlayImage"
        ref="overlayImage"
      ></v-image>
    </scalable-stage>
  </div>
</template>

<script>
import ScalableStage from "@/components/canvas/ScalableStage.vue"
import { calcScaling } from "@/utils/scaling.js"

export default {
  name: "ResultCanvas",
  components: {
    ScalableStage,
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
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMounted: false,
      layerConfig: {
        draggable: true,
      },
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
        image: this.config.baseImage.image,
      })
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
