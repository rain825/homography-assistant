export function pointsValidator(points) {
  return (
    points.length == 0 ||
    points.every(point => "color" in point && "pos" in point)
  )
}
