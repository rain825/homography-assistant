<template>
  <div class="list-item">
    <span :style="listItemStyle" class="item-color">{{ point.id }}</span>
    {{ coordinate }}
    <div @click="handleDelete" class="delete-button">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      type: Object,
      required: true,
    },
  },

  computed: {
    coordinate() {
      const { x, y } = this.point.pos
      return `(${parseInt(x, 10)}, ${parseInt(y, 10)})`
    },
    listItemStyle() {
      return {
        "background-color": this.point.color.bg,
        color: this.point.color.fg,
      }
    },
  },

  methods: {
    handleDelete() {
      const id = this.point.id
      console.log(`Emit Event (action='delete', id=${id})`)
      this.$emit("delete", id)
    },
  },
}
</script>

<style>
.list-item {
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
.list-item:hover {
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

.delete-button {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 60px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
}

.delete-button:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.delete-button:active {
  background-color: rgba(0, 0, 0, 0.7);
}

.delete-button span::before,
.delete-button span::after {
  display: block;
  content: "";
  position: absolute;
  top: 42%;
  left: 15%;
  width: 70%;
  height: 15%;
  background: #eee;
}

.delete-button span::before {
  transform: rotate(-45deg);
}

.delete-button span::after {
  transform: rotate(45deg);
}
</style>
