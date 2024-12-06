import os
from dotenv import load_dotenv
from application.maps.google_maps import GoogleMaps

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
load_dotenv('../../.env')
SBER_TOKEN = os.getenv("SBER_TOKEN")
MapsClient = GoogleMaps('some_key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("POSTGRES_CONN").replace(
    "postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from application import models, routes
