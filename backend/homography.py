import cv2
import numpy as np
import sys


def projectiveTransform(pointA, pointB, imgA, imgBWitdh, imgBHeight):
    """
        画像Aを画像Bの対応点に重なるように射影変換

      Args:
          pointA (array): 画像Aの対応点
          pointB (array): 画像Bの対応点
          imgA (numpy uint8): 変換する画像(画像A)。8bit3ch(BGR)を想定
          imgBWidth (int): 画像Bの幅
          imgBHeight (int): 画像Bの高さ

      Returns:
          numpy uint8: 射影変換した画像。BGRA

    """
    whiteImg = np.full(imgA.shape[::-1][1:], 255, np.uint8)

    ptsA = np.float32(pointA)
    ptsB = np.float32(pointB)

# 射影変換行列を計算
    M, mask = cv2.findHomography(ptsA, ptsB, 0)

    transformImg = cv2.warpPerspective(imgA, M, (imgBWitdh, imgBHeight))
    alphaCh = cv2.warpPerspective(whiteImg, M, (imgBWitdh, imgBHeight))

    b, g, r = cv2.split(transformImg)
    img_bgra = cv2.merge((b, g, r, alphaCh))

    return img_bgra


# dubug code
# 400 * 400 -> 500 * 500でテスト
if __name__ == '__main__':
    imgPath = sys.argv[1]
    img = cv2.imread(imgPath)
    ptsA = [[0, 0], [399, 0], [399, 399], [0, 399]]
    ptsB = [[249, 0], [499, 249], [249, 499], [100, 249]]
    transformImg = projectiveTransform(ptsA, ptsB, img, 500, 500)
    cv2.imwrite("test.png", transformImg)
