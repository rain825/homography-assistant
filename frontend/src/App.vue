<template>
  <div id="app">
    <Canvas />
    <Canvas />
  </div>
</template>

<script>
import Canvas from "./components/Canvas";

const cv = require("opencv4nodejs");

export default {
  name: "app",
  components: {
    Canvas
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
