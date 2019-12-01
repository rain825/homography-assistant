<template>
  <div class="code-block">
    <!-- Code Block -->
    <div class="header" @click="handleDownload">
      <file-icon class="icon"></file-icon>
      <span class="file-name">{{ name }}</span>
    </div>
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
import FileIcon from "@/assets/octicons/file.svg"
import "highlight.js/styles/github-gist.css"

export default {
  name: "CodeBlock",
  components: {
    FileIcon,
  },
  data() {
    return {
      name: "points.json",
      codes: {
        points_a: [
          { id: 0, x: 123, y: 456 },
          { id: 1, x: 111, y: 222 },
        ],
        points_: [
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
  --font-size: 1.2em;
  /* offset-x | offset-y | blur-radius | color */
  border: 0.2em solid gray;
  padding: 1em 1em;
  font-size: var(--font-size);
  border-radius: 1em;
  background-color: white;
}
.code {
  margin: 0px;
  height: calc(10 * var(--font-size));
  overflow: scroll;
}
.header {
  height: var(--font-size);
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: monospace;
  margin-bottom: 0.8em;
  color: green;
  fill: green;
}
.header:hover {
  text-decoration: underline;
  color: lightseagreen;
  fill: lightseagreen;
  text-decoration-color: lightseagreen;
}
.icon {
  height: inherit;
  width: auto;
  margin-right: 0.2em;
  fill: inherit;
}
</style>
