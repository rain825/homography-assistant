<template>
  <div class="points-list">
    <draggable
      :value="points"
      @end="drag = false"
      @input="swappedList => $emit('swap', swappedList)"
      @start="drag = true"
      v-bind="options"
    >
      <transition-group :name="!drag ? 'flip-list' : null" type="transition">
        <list-item
          :key="point.id"
          :point="point"
          @delete="handleDelete"
          v-for="point in points"
        ></list-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import ListItem from "./ListItem.vue"
import { pointsValidator } from "@/utils/validator"

export default {
  name: "PointsList",
  components: {
    draggable,
    ListItem,
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
    handleDelete(id) {
      this.$emit("delete", id)
    },
  },
}
</script>

<style scoped>
.points-list {
  overflow: scroll;
  width: 100%;
  height: 100%;
  border: 3px solid blue;
}
</style>
