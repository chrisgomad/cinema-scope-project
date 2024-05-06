from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route("/")
def home():
    response = requests.get('http://www.omdbapi.com/?apikey=87656d0d&s=Inception')
    data = response.json()
    return render_template('home.html', movies=data['Search'])

if __name__ == '__main__':
    app.run(debug=True)

