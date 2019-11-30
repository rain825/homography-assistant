export function pointsValidator(points) {
  return (
    points.length == 0 ||
    points.every(point => "id" in point && "color" in point && "pos" in point)
  )
}

export function scalingValidator(scaling) {
  return (
    ["ratio", "size"].every(key => key in scaling) &&
    ["image", "canvas"].every(key => key in scaling.size) &&
    ["native", "scaled"].every(key => key in scaling.size.image) &&
    ["width", "height"].every(key => key in scaling.size.image.native) &&
    [
      scaling.size.image.native,
      scaling.size.image.scaled,
      scaling.size.canvas,
    ].every(object => ["width", "height"].every(key => key in object))
  )
}
