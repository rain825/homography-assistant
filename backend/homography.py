import cv2
import numpy as np


def projective_transform(img, points_img, points_another, width, height):
    """
    2画像間で射影変換を行う

    Parameters
    ----------
    img : numpy.ndarray
        入力画像

    points_img: list of lists
        画像 `img` における対応点

    points_another : list of lists
        もう一方の画像における対応点

    width, height : int
        生成される画像の大きさ

    Returns
    -------
    numpy.ndarray
        射影変換結果画像 (BGRA カラー画像)
    """

    # Convert image
    if img.ndim == 2:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGRA)
    elif img.ndim == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Convert to numpy.ndarray
    points_img = np.float32(points_img)
    points_another = np.float32(points_another)

    # 射影変換行列を計算
    M, mask = cv2.findHomography(points_img, points_another, 0)

    transformed = cv2.warpPerspective(
        img,
        M,
        (width, height),
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0)
    )

    return transformed
