<template>
  <div class="wrapper">
    <draggable v-model="listItem" @start="drag = true" @end="drag = false">
      <div class="item-wrapper" v-for="(item, index) in listItem" :key="index">
        <div
          :style="{ 'background-color': item.color }"
          class="item-color"
        ></div>
        ( {{ item.pos.x }}, {{ item.pos.y }} )
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"

Array.prototype.choice = function() {
  return this[Math.floor(Math.random() * this.length)]
}

export default {
  name: "Test",
  components: {
    draggable,
  },
  data() {
    return {
      colors: [
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
      listItem: new Array(),
    }
  },
  created() {
    for (let i = 0; i < 5; i++) {
      this.listItem.push({
        pos: {
          x: parseInt(Math.random() * 1000, 10),
          y: parseInt(Math.random() * 1000, 10),
        },
        color: this.colors.choice(),
      })
    }
  },
  methods: {},
}
</script>

<style scoped>
.wrapper {
  width: 300px;
  border: 3px solid blue;
}
.item-wrapper {
  font-size: 2em;
  padding-left: 1ex;
  margin: 10px;
  line-height: 2em;
  font-weight: bold;
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
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border: 3px solid black;
  border-radius: 50%;
}
</style>
