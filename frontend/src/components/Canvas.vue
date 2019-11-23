<template>
  <canvas id="canvas" width="500" height="500" class="canvas"></canvas>
</template>

<script>
export default {
  props: {
    canvasWidth: {
      type: Number,
      default: 500
    },
    canvasHeight: {
      type: Number,
      default: 500
    },
    img: {
      type: Image,
      default: () => {
        new Image();
      }
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

      // ファイルタイプチェック
      if (!file.type.match("image.*")) {
        console.log("not image file");
        return;
      }

      let ctx = this.ctx;
      let canvasWidth = this.canvasWidth;
      let canvasHeight = this.canvasHeight;
      let img = this.img;

      // ファイル読み込み
      let fileReader = new FileReader();
      // 読み込み完了時にキャンバス描画
      fileReader.onload = function(e) {
        img.onload = function() {
          // 描画サイズを計算
          let drawCanvasWidth, drawCanvasHeight;
          if (img.naturalWidth > img.naturalHeight) {
            drawCanvasWidth = canvasWidth;
            drawCanvasHeight =
              (img.naturalHeight / img.naturalWidth) * canvasWidth;
          } else {
            drawCanvasWidth =
              (img.naturalWidth / img.naturalHeight) * canvasHeight;
            drawCanvasHeight = canvasHeight;
          }
          let x =
            (canvasWidth - drawCanvasWidth) / 2 > 0
              ? (canvasWidth - drawCanvasWidth) / 2
              : 0;
          let y =
            (canvasHeight - drawCanvasHeight) / 2 > 0
              ? (canvasHeight - drawCanvasHeight) / 2
              : 0;

          // 描画
          ctx.drawImage(img, x, y, drawCanvasWidth, drawCanvasHeight);
        };

        img.src = e.target.result;
      };

      fileReader.readAsDataURL(file);
    },
    // ドラッグ時の処理
    dragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }
  }
};
</script>

<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
