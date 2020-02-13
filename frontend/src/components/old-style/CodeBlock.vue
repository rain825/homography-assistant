<template>
  <div class="code-block-container">
    <div class="code-block" v-for="code in codeBlocks" :key="code.ext">
      <div class="header" @click="handleDownload(code)">
        <file-icon class="icon"></file-icon>
        <span class="file-name">{{ nameWithExtension(code.ext) }}</span>
      </div>
      <highlight-code :lang="code.lang" class="code">
        {{ code.contents }}
      </highlight-code>
    </div>
  </div>
</template>

<script>
import FileIcon from "@/assets/octicons/file.svg"
import "highlight.js/styles/github-gist.css"

const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]))

export default {
  name: "CodeBlock",
  components: {
    FileIcon,
  },
  props: {
    points: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "points",
    }
  },
  methods: {
    nameWithExtension(ext) {
      return `${this.name}.${ext}`
    },
    handleDownload(code) {
      // REF: https://kuroeveryday.blogspot.com/2016/05/file-download-from-browser.html
      const content = code.contents
      const blob = new Blob([content], {
        type: "text/plain",
      })

      const a = document.createElement("a")
      a.download = this.nameWithExtension(code.ext)
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
    asJSON() {
      const [pointsA, pointsB] = this.points

      return JSON.stringify(
        {
          points_a: pointsA.map(({ id, pos }) => ({ id, pos })),
          points_b: pointsB.map(({ id, pos }) => ({ id, pos })),
        },
        null,
        "  "
      )
    },
    asCSV() {
      const header = "A.x, A.y, B.x, B.y"

      return [
        header,
        ...zip(this.points).map(
          ([a, b]) => `${a.pos.x}, ${a.pos.y}, ${b.pos.x}, ${b.pos.y}`
        ),
      ].join("\n")
    },
    codeBlocks() {
      return [
        {
          ext: "json",
          lang: "json",
          contents: this.asJSON,
        },
        {
          ext: "csv",
          lang: "plaintext",
          contents: this.asCSV,
        },
      ]
    },
  },
}
</script>

<style scoped>
.code-block-container {
  --font-size: 1.2em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* offset-x | offset-y | blur-radius | color */
  border: 0.2em solid gray;
  padding: 1em 1em;
  font-size: var(--font-size);
  border-radius: 1em;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.code-block {
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.code {
  margin: 0px;
  /* height: calc(10 * var(--font-size)); */
  height: 90%;
  width: 100%;
  overflow: scroll;
}
.header {
  /* height: var(--font-size); */
  height: 10%;
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
  height: 100%;
  width: auto;
  margin-right: 0.2em;
  fill: inherit;
}
</style>
