import requests
import json
import pandas as pd
import pymongo
import json
from flask import Flask, jsonify, render_template
gkey = <include your googleAPI Key from >

conn = 'mongodb://localhost:27017'
travel = pymongo.MongoClient(conn)
db = travel.traveldata

# clean up the collection in MongoDB
db.location.drop()
db.target_type.drop()
db.city_data.drop()
db.type_reviews.drop()


# create location dictionary 
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
                  'name': "Singapore",
                },
                {
                  'location': "48.8566, 2.3522",
                  'name': "Paris",
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

# funtion to get co-ordinates per location
def get_coordinates(location):
    locations = db.location.find()
    loc_df = pd.DataFrame(list(locations))
    target_coordinates  =  loc_df[loc_df['name'] == location]['location'].values[0]
    
    return target_coordinates
 
 # get citites
def get_city_data(target_type): 
    
    target_radius = 8000
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    
    locations = db.location.find()
    is_data_found=db.location.count() 
    
    if is_data_found > 0:
        loc_df = pd.DataFrame(list(locations))
    
        for i in range(is_data_found): 
            print(loc_df['name'][i])
            target_coordinates= get_coordinates(loc_df['name'][i])
            params = {
                        "location": target_coordinates,
                        #"keyword": target_search,
                        "radius": target_radius,
                        "type": target_type, # input value
                        "key": gkey
                     }
            response = requests.get(base_url, params=params)
            # convert response to json
            places_data = response.json()
            data = pd.DataFrame(places_data["results"])
            data.dropna()
            data['rating']
            df = data[pd.notnull(data['rating'])]
            pd.options.display.max_colwidth = 200
            df_data=df.loc[df['user_ratings_total'] >= 5,['name','vicinity','rating','place_id','geometry']]
            city_data=df_data.nlargest(5,'rating')
            city_data['location']=loc_df['name'][i]
            city_data['target_type']=target_type
            # write to mongo 
            records = json.loads(city_data.T.to_json()).values()
            db.city_data.insert(records)
            
            
    return

# gather city data for each target type
db.city_data.drop()
targets = db.target_type.find()
is_data_found=db.target_type.count() 
target_df = pd.DataFrame(list(targets))
# get the citydata for each target type
target_df['target_type'][3]
for i in range(is_data_found): 
    print('===============================================')
    print('Getting data for '+ target_df['target_type'][i])
    print('===============================================')
    get_city_data(target_df['target_type'][i])
    print("Successfully Completed.")

