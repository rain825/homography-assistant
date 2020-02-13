<template>
  <transition name="fade">
    <div class="modal" v-if="visible" @click="closeModal">
      <div class="code-block-wrapper">
        <code-block :points="points"></code-block>
      </div>
    </div>
  </transition>
</template>

<script>
import CodeBlock from "./CodeBlock.vue"

export default {
  name: "FileExportModal",
  components: {
    CodeBlock,
  },
  model: {
    prop: "visible",
    event: "close",
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    points: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit("close")
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modal {
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}
.code-block-wrapper {
  width: 90%;
  height: 50%;
  box-sizing: border-box;
}
</style>
