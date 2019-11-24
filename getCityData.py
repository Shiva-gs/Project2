import requests
import json
import pandas as pd
import pymongo
import json
from flask import Flask, jsonify, render_template
 
conn = 'mongodb://localhost:27017'
travel = pymongo.MongoClient(conn)
db = travel.traveldata
 

# funtion to get co-ordinates per location
def get_coordinates(location):
    locations = db.location.find()
    loc_df = pd.DataFrame(list(locations))
    target_coordinates  =  loc_df[loc_df['name'] == location]['location'].values[0]
    
    return target_coordinates
 
 # get citites
def get_data(location,target_type):
  cities = db.city_data.find()
  city_df = pd.DataFrame(list(cities))
  pd.options.display.max_colwidth = 200
  out_df = city_df[(city_df['target_type']==target_type) & (city_df['location']==location)]
  return out_df

