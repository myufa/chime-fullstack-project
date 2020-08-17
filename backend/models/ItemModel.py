from sqlalchemy import Column, Integer, String, Float
from .Base import db

# Example model for your data structure
class ItemModel(db.Model):
    __tablename__ = 'menu'

    _id = Column(Integer, primary_key=True)
    name = Column(String(100))
    price = Column(Float)
    tag = Column(String, nullable=True)


