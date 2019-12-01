function fitToImageWidth(width, image) {
  const ratio = width / image.naturalWidth
  return {
    width: width,
    height: image.naturalHeight * ratio,
    scale: {
      x: ratio,
      y: ratio,
    },
  }
}
function fitToImageHeight(height, image) {
  const ratio = height / image.naturalHeight
  return {
    width: image.naturalWidth * ratio,
    height: height,
    scale: {
      x: ratio,
      y: ratio,
    },
  }
}
function fitToCanvasSize(width, height, image) {
  let ratio
  if (width >= height) {
    ratio = width / image.naturalWidth
  } else {
    ratio = height / image.naturalHeight
  }

  return {
    width,
    height,
    scale: {
      x: ratio,
      y: ratio,
    },
  }
}

export function calcScalableStageConfig({ width, height, image } = {}) {
  if (image === undefined || image === null) {
    throw Error("image is undefined or null.")
  }

  let config = undefined

  if (width !== undefined && height !== undefined) {
    config = fitToCanvasSize(width, height, image)
  } else {
    if (width !== undefined) {
      config = fitToImageWidth(width, image)
    } else {
      config = fitToImageHeight(height, image)
    }
  }
  return config
}
