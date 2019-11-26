export const calcScale = {
  basedOnWidth(width, image) {
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
            x: image.naturalWidth * ratio,
            y: image.naturalHeight * ratio,
          },
        },
        canvas: {
          width: width,
          height: image.naturalHeight * ratio,
        },
      },
    }
  },
  basedOnHeight(height, image) {
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
            x: image.naturalWidth * ratio,
            y: image.naturalHeight * ratio,
          },
        },
        canvas: {
          width: image.naturalWidth * ratio,
          height: height,
        },
      },
    }
  },
}
