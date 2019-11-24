# import necessary libraries
import requests
import json
import pandas as pd
import pymongo
import json
import os
from flask import Flask, jsonify, render_template
import getCityData


# create instance of Flask app
app = Flask(__name__, template_folder='.')

conn = 'mongodb://localhost:27017'
travel = pymongo.MongoClient(conn)
db = travel.traveldata

# List of dictionaries
locations = db.location.find() 
loc_df = pd.DataFrame(list(locations))

targets = db.target_type.find() 
target_df = pd.DataFrame(list(targets))

# create route that renders index.html template
@app.route("/")
def index():

    return render_template("index.html")

@app.route("/locations")
def locations():
    """Return a list of locations."""

    # Return a list of the column location (locations)
    return jsonify(list(loc_df['name']))

@app.route("/category")
def category():
    """Return a list of Target type."""
    # Return a list of the column category  
    return jsonify(list(target_df['target_type']))

@app.route("/citydata/<location>,<targe_type>")
def citydata(location,targe_type):
    city_data = getCityData.get_data(location,targe_type)
    df= city_data.drop(['_id'], axis=1)
    return df.to_json(orient='records') 

if __name__ == "__main__":
    app.run(debug=True)
