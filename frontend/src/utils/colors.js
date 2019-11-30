import chroma from "chroma-js"

export function pickColorWithBG(index) {
  const colors = chroma.brewer.Set3

  return {
    bg: colors[index % colors.length],
    fg: chroma("black").hex(),
  }
}
