<template>
  <div class="draggable-wrapper">
    <draggable
      v-bind="options"
      :value="points"
      @input="swappedList => $emit('swap', swappedList)"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="item-wrapper" v-for="point in points" :key="point.id">
          <span
            :style="{
              'background-color': point.color.bg,
              color: point.color.fg,
            }"
            class="item-color"
          >
            {{ point.id }}
          </span>
          {{ coordinate(point.pos) }}
        </div>
      </transition-group>
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
  data() {
    return {
      drag: false,
      options: {
        animation: 200,
      },
    }
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
  overflow: scroll;
  width: 100%;
  height: 100%;
  border: 3px solid blue;
}
.item-wrapper {
  height: 2em;
  font-size: 1.4em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-width: 3px;
  border-style: solid;
  border: 3px solid black;
  border-radius: 50%;
  color: black;
}
</style>
