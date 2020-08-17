import sys
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# import db & models
from models import db, ExampleModel, ItemModel, TagModel

app = Flask(__name__.split('.')[0])
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
db.init_app(app)

def to_dict(row):
    return {key: row.__dict__[key] for key in row.__dict__.keys() if key is not '_sa_instance_state'}

@app.route("/api/example/", methods=["GET", "POST", "PUT", "DELETE"])
def ExampleEndpoint():
    result = db.session.query(ExampleModel).filter(ExampleModel.number > 1)
    
    return {
        "results": [(dict(row.items())) for row in result]
    }, 200

@app.route("/api/menu/", methods = ["GET"])
def getMenu():
    result = db.session.query(ItemModel.ItemModel).all()
    print(result)
    return {
        "results": [to_dict(row) for row in result]
    }, 200

@app.route("/api/menu/add/", methods = ["POST"])
def addItem():
    req = request.get_json()
    print(req, type(req))
    print([key for key in ["name", "price"] if key not in req.keys()])
    if len([key for key in ["name", "price"] if key not in req.keys()]) > 0:
        return {"error": "invalid request"}, 400
    if "tag" in req and db.session.query(TagModel.TagModel)\
            .filter_by(name=req["tag"]).scalar() is None:
        return{"error": "invalid tag"}, 400
    try :
        db.session.add(ItemModel.ItemModel(**req))
        db.session.commit()
    except Exception as e:
        return {"error": str(e)}, 503
    
    return {"status": "success!"}, 200

@app.route("/api/menu/item/<int:_id>/", methods = ["DELETE"])
def deleteItem(_id):
    print(_id)
    try:
        db.session.query(ItemModel.ItemModel).filter_by(_id=_id).delete()
        db.session.commit()
    except Exception as e:
        print("fail")
        return {"error": str(e)}, 503
    
    return {"status": "success!"}, 200

@app.route("/api/tags/", methods = ["GET"])
def getTags():
    result = db.session.query(TagModel.TagModel).all()
    print(result)
    return {
        "results": [to_dict(row) for row in result]
    }, 200

@app.route("/api/tags/add/", methods = ["POST"])
def addTag():
    req = request.get_json()
    print(req, type(req))
    if "name" not in req.keys():
        return {"error": "invalid request"}, 400
    try :
        db.session.add(TagModel.TagModel(**req))
        db.session.commit()
    except Exception as e:
        print("fail")
        return {"error": str(e)}, 503
    
    return {"status": "success!"}, 200

with app.app_context():
	db.create_all()

if __name__ == "__main__":
    app.run()
