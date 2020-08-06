from sqlalchemy import Column, Integer

from .Base import db

# Example model for your data structure
class ExampleModel(db.Model):
    __tablename__ = 'example_table'

    number = Column(Integer, default=0, primary_key=True)

