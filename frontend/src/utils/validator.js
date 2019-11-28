export function pointsValidator(points) {
  return (
    points.length == 0 ||
    points.every(point => "id" in point && "color" in point && "pos" in point)
  )
}
