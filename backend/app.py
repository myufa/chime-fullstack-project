from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# import db & models
from models import db, ExampleModel

app = Flask(__name__.split('.')[0])
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
db.init_app(app)

@app.route("/api/example", methods=["GET", "POST", "PUT", "DELETE"])
def ExampleEndpoint():
    result = db.session.query(ExampleModel).filter(ExampleModel.number > 1)
    
    return {
        "results": [(dict(row.items())) for row in result]
    }, 200

with app.app_context():
	db.create_all()

if __name__ == "__main__":
    app.run()
