export function pointsValidator(points) {
  return (
    points.length == 0 ||
    points.every(point => "id" in point && "color" in point && "pos" in point)
  )
}

export function scalableStageConfigValidator(config) {
  // return {
  //   width: width,
  //   height: image.naturalHeight * ratio,
  //   scale: {
  //     x: ratio,
  //     y: ratio,
  //   },
  // }
  return (
    ["width", "height", "scale"].every(key => key in config) &&
    ["x", "y"].every(key => key in config.scale)
  )
}
