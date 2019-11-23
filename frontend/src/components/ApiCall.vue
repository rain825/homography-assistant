<template>
  <div>
    <button @click="handleClick">Convert</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    handleClick() {
      axios
        .get("/api")
        .then(resp => alert(resp.data))
        .catch(error => alert("error"));
    }
  }
};
</script>
