from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)



CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:Blooddonar%402025@db.rsthllwwpaaaepthxfhk.supabase.co:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)

class users(db.Model):
    name=db.Column(db.Text,nullable=False)
    usn=db.Column(db.Text,primary_key=True,nullable=False)
    role=db.Column(db.Text)
    dob=db.Column(db.Text)
    gender=db.Column(db.Text)
    bg=db.Column(db.Text)
    location=db.Column(db.Text)
    contact=db.Column(db.Text)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/register',methods=['POST'])
def register():
    data=request.json
    if data['name']=='' or data['usn']=='' :
        return jsonify({'message':'Please fill all fields'}),400
    newuser=users(name=data['name'].lower(),usn=data['usn'].lower())
    db.session.add(newuser)
    db.session.commit()
    return jsonify({'message':'User created successfully'}),201

@app.route('/login',methods=['POST'])
def login():
    data=request.json
    if data['name']=='' or data['usn']=='' :
        return jsonify({'message':'Please fill all fields'}),400
    result=users.query.filter_by(name=data['name'].lower() , usn=data['usn'].lower()).first()
    if not result:
        return jsonify({'status':400}),401
    else:
        return jsonify({'status':200}),200

@app.route('/getdonar',methods=['POST'])
def getdonar():
    data=request.json
    result=users.query.filter(users.role=='donar',users.bg==data['bg'],users.usn!=data['usn']).all()
    return jsonify([ u.to_dict()for u in result]),200

@app.route('/updateprofile',methods=['POST'])
def updateprofile():
    data=request.json
    a=users.query.filter_by(usn=data['usn']).first()
    if not a:
        return jsonify({'message':'User not found'}),404
    a.dob=data['dob']
    a.role=data['role']
    a.gender=data['gender']
    a.bg=data['bg']
    a.location=data['location']
    a.contact=data['contact']
    db.session.commit()
    return jsonify({'message':'Profile updated successfully'}),200

@app.route('/viewprofile',methods=["POST"])
def viewprofile():
    data=request.json
    result=users.query.filter_by(usn=data['usn']).first()
    return jsonify(result.to_dict()),200

@app.route('/deleteuser',methods=['POST'])
def deleteuser():
    data=request.json
    newuser=users.query.filter_by(usn=data['usn']).first()
    db.session.delete(newuser)
    db.session.commit()
    return jsonify({'message':'User deleted successfully'}),200






if __name__=="__main__":
    app.run(debug=True)

   