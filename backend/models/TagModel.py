from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from .Base import db

# Example model for your data structure
class TagModel(db.Model):
    __tablename__ = 'tags'

    _id = Column(Integer, primary_key=True)
    name = Column(String(100))
