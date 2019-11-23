# import necessary libraries
import requests
import json
import pandas as pd
import pymongo
import json
import os
from flask import Flask, jsonify, render_template


# create instance of Flask app
app = Flask(__name__, template_folder='.')

conn = 'mongodb://localhost:27017'
travel = pymongo.MongoClient(conn)
db = travel.traveldata

# List of dictionaries
locations = db.location.find() 
loc_df = pd.DataFrame(list(locations))


# create route that renders index.html template
@app.route("/")
def index():

    return render_template("index.html")

@app.route("/locations")
def locations():
    """Return a list of locations."""

    # Return a list of the column location (locations)
    return jsonify(list(loc_df['name']))

if __name__ == "__main__":
    app.run(debug=True)