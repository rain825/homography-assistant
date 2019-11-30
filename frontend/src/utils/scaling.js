function basedOnWidth(width, image) {
  const ratio = width / image.naturalWidth
  console.log(`Ratio: ${ratio}`)
  return {
    ratio: ratio,
    size: {
      image: {
        native: {
          width: image.naturalWidth,
          height: image.naturalHeight,
        },
        scaled: {
          width: image.naturalWidth * ratio,
          height: image.naturalHeight * ratio,
        },
      },
      canvas: {
        width: width,
        height: image.naturalHeight * ratio,
      },
    },
  }
}
function basedOnHeight(height, image) {
  const ratio = height / image.naturalHeight
  console.log(`Ratio: ${ratio}`)
  return {
    ratio: ratio,
    size: {
      image: {
        native: {
          width: image.naturalWidth,
          height: image.naturalHeight,
        },
        scaled: {
          width: image.naturalWidth * ratio,
          height: image.naturalHeight * ratio,
        },
      },
      canvas: {
        width: image.naturalWidth * ratio,
        height: height,
      },
    },
  }
}

export function calcScaling({ width, height, image } = {}) {
  if (width !== undefined && height !== undefined) {
    if (width >= height) {
      return basedOnWidth(width, image)
    } else {
      return basedOnHeight(height, image)
    }
  } else {
    if (width !== undefined) {
      return basedOnWidth(width, image)
    } else {
      return basedOnHeight(height, image)
    }
  }
}
