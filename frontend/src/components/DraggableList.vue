<template>
  <div class="draggable-wrapper">
    <draggable v-model="points" @start="drag = true" @end="drag = false">
      <div class="item-wrapper" v-for="(point, index) in points" :key="index">
        <div
          :style="{ 'background-color': point.color }"
          class="item-color"
        ></div>
        {{ coordinate(point.pos) }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import { pointsValidator } from "@/utils/validator"

export default {
  name: "DraggableList",
  components: {
    draggable,
  },
  props: {
    points: {
      type: Array,
      required: true,
      validator: pointsValidator,
    },
  },
  methods: {
    coordinate(pos) {
      const { x, y } = pos
      return `(${parseInt(x, 10)}, ${parseInt(y, 10)})`
    },
  },
}
</script>

<style scoped>
.draggable-wrapper {
  width: 100%;
  border: 3px solid blue;
}
.item-wrapper {
  min-height: 30px;
  font-size: 1.6em;
  padding: 0.5ex 1ex;
  margin: 10px;
  font-weight: 400;
  font-family: monospace;
  text-align: center;
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.item-wrapper:hover {
  background-color: rgba(64, 128, 255, 0.3);
}

.item-color {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 3px solid black;
  border-radius: 50%;
}
</style>
