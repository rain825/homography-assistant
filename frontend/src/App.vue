<template>
  <div id="app">
    <div>
      <Canvas />
      <Canvas />
    </div>
    <ApiCall />
  </div>
</template>

<script>
import Canvas from "./components/Canvas";
import ApiCall from "./components/ApiCall";

export default {
  name: "app",
  components: {
    Canvas,
    ApiCall
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
