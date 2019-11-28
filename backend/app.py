from flask import Flask, render_template, request, jsonify
import json
import numpy as np
import base64
import homography
import cv2

app = Flask(
    __name__,
    template_folder="./dist",
    static_folder="./dist/static",
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api", methods=["GET", "POST"])
def api_endpoint():
    try:
        if request.method == "GET":
            return "びゅー"
        elif request.method == "POST":
            data = request.get_json()
            transformImg = homography.projectiveTransform(data["pointsA"], data["pointsB"], base64ToMat(
                data["img"]), data["width"], data["height"])
            sendData = {"img": "data:image/png;base64," +
                        matTobase64(transformImg)}
            return jsonify(sendData)
    except Exception as e:
        return str(e)


def base64ToMat(base64str):
    imgBinary = base64.b64decode(base64str)
    imgNp = np.frombuffer(imgBinary, np.uint8)
    imgMat = cv2.imdecode(imgNp, cv2.IMREAD_ANYCOLOR)

    return imgMat


def matTobase64(img):
    result, imgData = cv2.imencode(".png", img)
    imgBase64 = base64.b64encode(imgData).decode("ascii")

    return imgBase64


if __name__ == '__main__':
    app.run(debug=True, port=5050)
