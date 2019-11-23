import requests
import json
import pandas as pd
import pymongo
import json
from flask import Flask, jsonify, render_template
conn = 'mongodb://localhost:27017'
travel = pymongo.MongoClient(conn)
db = travel.traveldata

location_dict = [{
                  'location': "40.7128, -74.0059",
                  'name': "New York",
                },
                {
                  'location': "13.756331, 100.501762",
                  'name': "Bangkok",
                },
                {
                  'location': "51.507351, -0.127758",
                  'name': "London",
                },
                {
                  'location': "25.204849, 55.270782",
                  'name': "Dubai",
                },
                {
                  'location': "1.3521, 103.8198",
                  'name': "Singapore ",
                },
                {
                  'location': "48.8566, 2.3522",
                  'name': "Paris ",
                }
                ]

#location_dict
target_type = [{'target_type':'car_rental'},
              {'target_type':'restaurant'},
              {'target_type':'lodging'},
              {'target_type':'shopping_mall'}
              ]

 # insert target type into MongoDB
target_types = db.target_type.find()
is_data_found=db.target_type.count() 

if is_data_found == 0:
    for i in range(len(target_type)):
        db.target_type.insert_one(target_type[i])              

# insert locations data into MongoDB
locations = db.location.find()
is_data_found=db.location.count() 

if is_data_found == 0:
    for i in range(len(location_dict)):
        db.location.insert_one(location_dict[i])