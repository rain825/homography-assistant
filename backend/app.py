from base64 import b64decode, b64encode
from flask import Flask, render_template, request, jsonify

import cv2
import numpy as np

from homography import projective_transform


def data_url_to_ndarray(data_url):
    b64_data = data_url.split(",")[1]

    return cv2.imdecode(
        np.frombuffer(
            b64decode(b64_data),
            dtype=np.uint8
        ),
        cv2.IMREAD_ANYCOLOR
    )


def ndarray_to_data_url(img):
    PREFIX = "data:image/png;base64"

    return ",".join([
        PREFIX,
        b64encode(
            cv2.imencode(".png", img)[1],
        ).decode("ascii")
    ])


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
            args = request.get_json()

            args["img"] = data_url_to_ndarray(args["img"])

            result = projective_transform(**args)
            
            return jsonify({
                "img": ndarray_to_data_url(result)
            })
    
    except Exception as e:
        response = jsonify({"message": str(e)})
        response.status_code = 500
        return response


if __name__ == '__main__':
    app.run(debug=True, port=5000)
