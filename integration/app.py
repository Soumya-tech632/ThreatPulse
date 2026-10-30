from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

PHISHGUARD_URL = "http://127.0.0.1:8000"
DEEPFAKE_URL = "http://127.0.0.1:8001"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/health")
def health():
    result = {
        "phishguard": False,
        "deepfake": False
    }

    # Check PhishGuard
    try:
        response = requests.get(
            f"{PHISHGUARD_URL}/docs",
            timeout=3
        )
        result["phishguard"] = response.status_code == 200
    except requests.RequestException:
        pass

    # Check Deepfake
    try:
        response = requests.get(
            f"{DEEPFAKE_URL}/",
            timeout=3
        )
        result["deepfake"] = response.status_code == 200
    except requests.RequestException:
        pass

    return jsonify(result)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)