<template>
  <div class="wrapper">
    <draggable v-model="listItem" @start="drag = true" @end="drag = false">
      <div class="item" v-for="(item, index) in listItem" :key="item">
        {{ index }}: {{ item }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"

export default {
  name: "Test",
  components: {
    draggable,
  },
  data() {
    return {
      listItem: ["チノ", "ココア", "リゼ", "シャロ", "千夜"],
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped>
.wrapper {
  width: 300px;
  border: 3px solid blue;
}
.item {
  font-size: 2em;
  padding-left: 1ex;
  margin: 10px;
  line-height: 2em;
  font-weight: bold;
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

.item:hover {
  background-color: rgba(64, 128, 255, 0.3);
}
</style>
