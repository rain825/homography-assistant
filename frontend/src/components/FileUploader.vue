<template>
  <div
    class="drop-area"
    @dragenter.prevent="handleEnterDropArea"
    @dragleave.prevent="handleLeaveDropArea"
    @dragover.prevent
    @drop.prevent.stop="handleSubmit"
  >
    <label :class="{ overlay: canvasVisible, 'in-drop-area': isInDropArea}">
      <div class="message">Click here or drop file to open image</div>
      <input @change="handleSubmit" name="imgFile" ref="file" style="display:none;" type="file" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    canvasVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dropAreaCounter: 0,
      isInDropArea: false
    };
  },
  methods: {
    handleEnterDropArea() {
      this.dropAreaCounter++;
      this.isInDropArea = true;
      console.debug(`enterDropArea:${this.dropAreaCounter}`);
    },
    handleLeaveDropArea() {
      this.dropAreaCounter--;
      if (this.dropAreaCounter === 0) {
        this.isInDropArea = false;
      }
      console.debug(`leaveDropArea:${this.dropAreaCounter}`);
    },
    handleSubmit(event) {
      const file = event.target.files
        ? event.target.files[0]
        : event.dataTransfer.files[0];
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const image = new Image();
        image.onload = () => {
          this.$emit("submit", image);
        };
        image.src = event.target.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
label {
  width: 100%;
  min-height: 500px;
  height: 100%;
  padding: 18px;
  background-color: transparent;
  color: black;
  box-sizing: border-box;
  outline: 5px dotted #222;
  outline-offset: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition: 0.1s;
}
label:hover {
  background-color: rgba(64, 128, 255, 0.3);
}

.in-drop-area {
  background-color: rgba(64, 255, 121, 0.3);
}
.overlay {
  position: absolute;
  top: 0px;
  z-index: 10;
}
.message {
  /* line-height: 20rem; */
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
