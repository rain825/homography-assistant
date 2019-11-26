<template>
  <div class="selector-wrapper">
    <image-container
      :points="points"
      @add-point="handleAddPoint"
      @drag-point="handleDragPoint"
    >
    </image-container>
    <draggable-list :points="points" @swap="handleListSwap"></draggable-list>
  </div>
</template>

<script>
import ImageContainer from "@/components/ImageContainer.vue"
import DraggableList from "@/components/DraggableList.vue"

export default {
  name: "PointsSelector",
  components: {
    ImageContainer,
    DraggableList,
  },
  data() {
    return {
      colorList: [
        "cyan",
        "blue",
        "magenta",
        "maroon",
        "lime",
        "red",
        "yellow",
        "green",
        "navy",
        "orange",
      ],
      points: [],
    }
  },
  methods: {
    handleAddPoint(pos) {
      console.debug(
        `handleAddPoint@PointSelector <pos=${JSON.stringify(pos)}}>`
      )
      const colorNum = this.points.length % this.colorList.length
      this.points.push({
        pos: pos,
        color: this.colorList[colorNum],
      })
    },
    handleDragPoint(idx, newPos) {
      console.debug(
        `handleDragOnPoint@PointSelector <idx=${idx}, newPos=(${newPos.x}, ${newPos.y})>`
      )

      const points = this.points

      points.splice(idx, 1, {
        ...points[idx],
        pos: newPos,
      })
    },
    handleListSwap(swappedList) {
      console.debug("handleListSwap@PointsSelector")
      console.debug(swappedList)

      this.points = swappedList
    },
  },
}
</script>

<style scoped>
.selector-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
