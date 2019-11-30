from flask import Flask, jsonify, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/map")
def travel():
    return render_template('map.html')

@app.route("/map-test")
def test():
    return render_template('map-test.html')


@app.route("/newyork")
def newyork():
    return render_template('newyork.html')


if __name__ == "__main__":
    app.run(debug=True)
