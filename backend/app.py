from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder="./dist",
    static_folder="./dist/static",
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api", methods=["GET"])
def api_endpoint():
    return "びゅー"


if __name__ == '__main__':
    app.run(debug=True, port=5050)
