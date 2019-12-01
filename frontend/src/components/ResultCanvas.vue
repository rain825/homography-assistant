<template>
  <div id="result-canvas" class="result-canvas">
    <scalable-stage
      :config="stageConfig"
      v-if="
        config.baseImage.image !== null && config.overlayImage.image !== null
      "
    >
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
import { calcScalableStageConfig } from "@/utils/configs.js"

export default {
  name: "ResultCanvas",
  components: {
    ScalableStage,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      layerConfig: {
        draggable: true,
      },
      stageSize: null,
    }
  },
  mounted() {
    this.stageSize = {
      width: this.$el.clientWidth,
      height: this.$el.clientHeight,
    }
  },
  computed: {
    stageConfig() {
      return calcScalableStageConfig({
        ...this.stageSize,
        image: this.config.baseImage.image,
      })
    },
  },
}
</script>

<style scoped>
.result-canvas {
  height: 100%;
}
</style>
