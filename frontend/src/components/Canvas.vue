<template>
  <canvas id="canvas" width="500" height="500" class="canvas"></canvas>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 50
    }
  },
  mounted() {
    this.ctx = this.$el.getContext("2d");

    // ドラッグ&ドロップイベント登録
    this.$el.addEventListener("dragover", this.dragOver, false);
    this.$el.addEventListener("drop", this.drawCancas, false);
  },
  methods: {
    // 画像ファイル描画
    drawCancas(e) {
      // イベント伝播を停止
      e.stopPropagation();
      e.preventDefault();

      // 一番目のファイルを取得
      let file = e.dataTransfer.files[0];
      console.log(file.name);
    },
    // ドラッグ時の処理
    dragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "draw"; // Explicitly show this is a copy.
    }
  }
};
</script>

<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
