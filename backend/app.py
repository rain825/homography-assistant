from flask import Flask, render_template, request

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
            print("data:", request.get_data())
            return "post"
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True, port=5050)
