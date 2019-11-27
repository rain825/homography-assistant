<template>
  <button @click="handleClick">transform</button>
</template>

<script>
export default {
  name: "ProccessController",
  methods: {
    handleClick() {
      this.$emit("send")
    },
  },
}
</script>
