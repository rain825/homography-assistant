<template>
  <div class="code-block">
    <!-- Code Block -->
    <div class="header" @click="handleDownload">{{ name }}</div>
    <highlight-code lang="json" class="code">
      {{ asString }}
    </highlight-code>
    <!-- Inline Code Block -->
    <!-- <highlight-code lang="javascript" inline
      >alert('Hello, World!');</highlight-code
    > -->
  </div>
</template>

<script>
import "highlight.js/styles/github-gist.css"

export default {
  name: "CodeBlock",
  data() {
    return {
      name: "points.json",
      codes: {
        points_a: [
          { id: 0, x: 123, y: 456 },
          { id: 1, x: 111, y: 222 },
        ],
      },
    }
  },
  methods: {
    handleDownload() {
      // REF: https://kuroeveryday.blogspot.com/2016/05/file-download-from-browser.html
      const content = this.asString
      const blob = new Blob([content], {
        type: "text/plain",
      })

      const a = document.createElement("a")
      a.download = this.name
      a.target = "_blank"

      if (window.navigator.msSaveBlob) {
        // for IE
        window.navigator.msSaveBlob(blob, name)
      } else if (window.URL && window.URL.createObjectURL) {
        // for Firefox
        a.href = window.URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else if (window.webkitURL && window.webkitURL.createObject) {
        // for Chrome
        a.href = window.webkitURL.createObjectURL(blob)
        a.click()
      } else {
        // for Safari
        window.open(
          `data:text/plain;base64,${window.Base64.encode(content)}`,
          "_blank"
        )
      }
    },
  },
  computed: {
    asString() {
      return JSON.stringify(this.codes, null, "  ")
    },
  },
}
</script>

<style scoped>
.code-block {
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 5px 5px 10px black;
  border: 1px solid lightgray;

  position: relative;
}
.code {
  margin: 0px;
  padding: 2em 0.5em;
}
.header::before {
  content: "</";
  font-size: 1.5em;
  padding-right: 0.2em;
  color: red;
}
.header::after {
  content: ">";
  font-size: 1.5em;
  padding-left: 0.2em;
  color: red;
}
.header {
  font-weight: bold;
  height: 16px;
  font-size: 1em;
  padding: 0.2em 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  background-color: white;
  position: absolute;
  top: 0px;
  left: 0px;
}
.header:hover {
  text-decoration: underline;
  color: cornflowerblue;
  text-decoration-color: cornflowerblue;
}
.header:hover::before {
  text-decoration: none;
  color: cornflowerblue;
  text-decoration-color: cornflowerblue;
}
.header:hover::after {
  text-decoration: none;
  color: cornflowerblue;
  text-decoration-color: cornflowerblue;
}
</style>
