from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/members')
def members():
    member_list = ["Member1", "Member2", "Member3"]
    return jsonify({"members": member_list})

if __name__ == '__main__':
    app.run(debug=True)
