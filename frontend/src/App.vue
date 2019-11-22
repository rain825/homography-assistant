<template>
  <div id="app">
    <ApiTest />
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello, Flask × vue-cli" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import ApiTest from "./components/ApiTest"

export default {
  name: "app",
  components: {
    HelloWorld,
    ApiTest,
  },
}
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
