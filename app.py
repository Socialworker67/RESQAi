from flask import Flask, request, jsonify, render_template_string
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

app = Flask(__name__)


def load_dataset():
    return [
        {"label": "ham", "message": "Hey how are you"},
        {"label": "spam", "message": "Congratulations! You won ₹50000"},
        {"label": "ham", "message": "Let's meet tomorrow"},
        {"label": "spam", "message": "Claim your free prize now"},
        {"label": "ham", "message": "Call me when you reach"},
        {"label": "spam", "message": "Win cash now click here"},
    ]


def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


dataset = load_dataset()
cleaned_messages = [clean_text(item["message"]) for item in dataset]
labels = [item["label"] for item in dataset]

vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(cleaned_messages)

model = MultinomialNB()
model.fit(X_vec, labels)
model_accuracy = round(accuracy_score(labels, model.predict(X_vec)) * 100, 2)

history = []

html_page = '''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Spam Detection AI</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(92, 56, 212, 0.9), transparent 30%),
        radial-gradient(circle at bottom right, rgba(47, 128, 237, 0.65), transparent 26%),
        linear-gradient(135deg, #090b18, #10152e 50%, #04050a 100%);
      color: #f5f7ff;
      overflow-x: hidden;
    }
    .container {
      display: flex;
      min-height: 100vh;
    }
    .main {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }
    .card {
      background: linear-gradient(180deg, rgba(16, 21, 48, 0.96), rgba(28, 16, 62, 0.95));
      backdrop-filter: blur(14px);
      padding: 32px;
      border-radius: 26px;
      width: 560px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(112, 175, 255, 0.18);
      border: 1px solid rgba(117, 171, 255, 0.22);
      animation: fadeIn 1s ease;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(96, 73, 255, 0.14), transparent 35%, rgba(100, 214, 255, 0.13));
      pointer-events: none;
    }
    .upload-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .upload-box {
      flex: 1;
      min-width: 180px;
      padding: 10px;
      border-radius: 12px;
      background: rgba(9, 16, 33, 0.9);
      border: 1px solid rgba(132, 187, 255, 0.28);
    }
    .upload-box label {
      display: block;
      font-size: 12px;
      color: #8fd7ff;
      margin-bottom: 6px;
      font-weight: bold;
    }
    .upload-box input[type="file"] {
      width: 100%;
      color: #dce9ff;
      font-size: 12px;
    }
    textarea {
      width: 100%;
      height: 112px;
      border: 1px solid rgba(138, 194, 255, 0.3);
      border-radius: 14px;
      padding: 12px;
      font-size: 16px;
      background: rgba(7, 11, 24, 0.94);
      color: #eff5ff;
      box-sizing: border-box;
      outline: none;
      box-shadow: inset 0 0 0 1px rgba(83, 151, 255, 0.12);
    }
    textarea:focus {
      border-color: #7ddcff;
      box-shadow: 0 0 0 2px rgba(97, 216, 255, 0.25), inset 0 0 0 1px rgba(97, 216, 255, 0.12);
    }
    button {
      padding: 11px 18px;
      margin: 5px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: 0.3s;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .check { background: linear-gradient(135deg, #7b4dff, #2f80ed); color: #fff; }
    .clear { background: linear-gradient(135deg, #ff5c8a, #a61ffe); color: #fff; }
    .ghost { background: linear-gradient(135deg, #3994ff, #59d0ff); color: #06101f; }
    button:hover { transform: scale(1.05); box-shadow: 0 8px 18px rgba(77, 120, 255, 0.35); }
    .result {
      font-size: 24px;
      margin-top: 12px;
      font-weight: bold;
      text-shadow: 0 0 14px rgba(93, 202, 255, 0.2);
    }
    .progress {
      height: 12px;
      background: rgba(160, 190, 255, 0.16);
      border-radius: 12px;
      overflow: hidden;
      margin-top: 12px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
    }
    .bar {
      height: 12px;
      width: 0%;
      background: linear-gradient(90deg, #72f0ff, #4d92ff 55%, #7b4dff);
      transition: 1s;
      box-shadow: 0 0 12px rgba(101, 214, 255, 0.4);
    }
    .explain-box {
      margin-top: 14px;
      padding: 12px;
      border-radius: 12px;
      background: rgba(9, 15, 31, 0.86);
      border: 1px solid rgba(128, 183, 255, 0.24);
      color: #dfeaff;
      font-size: 14px;
      line-height: 1.5;
    }
    .preview-box {
      margin-top: 14px;
      padding: 10px;
      border-radius: 12px;
      background: rgba(10, 14, 28, 0.88);
      border: 1px solid rgba(124, 156, 255, 0.2);
      display: none;
    }
    .preview-box img {
      max-width: 100%;
      border-radius: 10px;
    }
    .sidebar {
      flex: 1;
      background: linear-gradient(180deg, rgba(9, 12, 28, 0.98), rgba(15, 16, 38, 0.98));
      overflow-y: auto;
      padding: 16px;
      border-left: 1px solid rgba(124, 156, 255, 0.18);
    }
    .history-item {
      padding: 10px;
      border-bottom: 1px solid rgba(124, 156, 255, 0.18);
      background: rgba(255, 255, 255, 0.04);
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .spam { color: #ff7e9f; }
    .ham { color: #7df9ff; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #5532c6, #2f80ed);
      padding: 12px 16px;
      border-radius: 12px;
      display: none;
      color: #fff;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="main">
      <div class="card">
        <h2>Spam Detection AI</h2>

        <div class="upload-row">
          <div class="upload-box">
            <label for="fileInput">Upload text file</label>
            <input id="fileInput" type="file" accept=".txt,.csv,.json,.md" />
          </div>
          <div class="upload-box">
            <label for="imageInput">Upload image</label>
            <input id="imageInput" type="file" accept="image/*" />
          </div>
        </div>

        <textarea id="msg" placeholder="Type your message or load a file..."></textarea>
        <br>
        <button class="check" onclick="checkSpam()">Check Spam</button>
        <button class="clear" onclick="clearText()">Clear</button>
        <button class="ghost" onclick="copyResult()">Copy Result</button>
        <button class="ghost" onclick="toggleMode()">Dark/Light</button>

        <div class="preview-box" id="previewBox">
          <img id="previewImage" alt="Uploaded preview" />
        </div>

        <div class="result" id="result"></div>
        <div class="progress">
          <div class="bar" id="bar"></div>
        </div>
        <canvas id="chart"></canvas>
        <div class="explain-box" id="explain"></div>
      </div>
    </div>

    <div class="sidebar">
      <h3>History</h3>
      <button class="ghost" onclick="clearHistory()">Clear History</button>
      <div id="history"></div>
    </div>
  </div>

  <div class="toast" id="toast">Done</div>

  <script>
    let chart;

    document.getElementById("fileInput").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const text = await file.text();
      document.getElementById("msg").value = text;
      showToast("Loaded file: " + file.name);
    });

    document.getElementById("imageInput").addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const preview = document.getElementById("previewImage");
      const previewBox = document.getElementById("previewBox");
      preview.src = url;
      previewBox.style.display = "block";
      showToast("Loaded image: " + file.name);
    });

    function checkSpam() {
      let msg = document.getElementById("msg").value.trim();

      if (!msg) {
        document.getElementById("explain").innerHTML = "Please type a message or upload a text file first.";
        showToast("Enter a message");
        return;
      }

      fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      })
      .then(res => res.json())
      .then(data => {
        let result = data.result;
        let spam = data.spam_percent ?? (data.spam * 100);
        let ham = data.ham_percent ?? (data.ham * 100);

        let resultDiv = document.getElementById("result");
        if (result === "spam") {
          resultDiv.innerHTML = "SPAM DETECTED";
          resultDiv.style.color = "#ff7e9f";
        } else {
          resultDiv.innerHTML = "NOT SPAM";
          resultDiv.style.color = "#7df9ff";
        }

        document.getElementById("bar").style.width = spam + "%";

        if (chart) chart.destroy();
        let ctx = document.getElementById("chart");
        chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Spam", "Ham"],
            datasets: [{ data: [spam, ham] }]
          }
        });

        let keywords = ["free", "win", "offer", "click", "prize", "cash", "claim"];
        let found = keywords.filter(k => msg.toLowerCase().includes(k));
        let explanation = result === "spam"
          ? "This message looks like spam because it contains suspicious terms such as: " + (found.length ? found.join(", ") : "no strong spam keyword was found") + "."
          : "This message looks like ham because it is more natural and does not contain the common spam trigger words.";
        document.getElementById("explain").innerHTML = explanation
          + "<br><strong>Spam Confidence:</strong> " + spam.toFixed(2) + "%"
          + "<br><strong>Ham Confidence:</strong> " + ham.toFixed(2) + "%"
          + "<br><strong>Model Accuracy:</strong> " + data.accuracy + "%";

        showToast("Prediction: " + result.toUpperCase());
        loadHistory();
      });
    }

    function clearText() {
      document.getElementById("msg").value = "";
      document.getElementById("result").innerHTML = "";
      document.getElementById("bar").style.width = "0%";
      document.getElementById("explain").innerHTML = "";
      document.getElementById("previewBox").style.display = "none";
      document.getElementById("previewImage").src = "";
      document.getElementById("fileInput").value = "";
      document.getElementById("imageInput").value = "";
    }

    function clearHistory() {
      fetch("/clear-history", {
        method: "POST"
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === "cleared") {
          loadHistory();
          showToast("History cleared");
        }
      });
    }

    function loadHistory() {
      fetch("/history")
      .then(res => res.json())
      .then(data => {
        let div = document.getElementById("history");
        div.innerHTML = "";
        data.forEach(item => {
          let el = document.createElement("div");
          el.className = "history-item " + item.result;
          el.innerHTML = item.message + " → " + item.result;
          div.appendChild(el);
        });
      });
    }

    function toggleMode() {
      document.body.classList.toggle("dark");
    }

    function copyResult() {
      navigator.clipboard.writeText(document.getElementById("result").innerText);
    }

    function showToast(msg) {
      let t = document.getElementById("toast");
      t.textContent = msg || "Done";
      t.style.display = "block";
      setTimeout(() => t.style.display = "none", 2000);
    }

    window.onload = loadHistory;
  </script>
</body>
</html>
'''


@app.route("/")
def home():
    return render_template_string(html_page)


@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(silent=True) or {}
    msg = payload.get("message", "")

    if not msg:
        return jsonify({"error": "message is required"}), 400

    cleaned = clean_text(msg)
    vec = vectorizer.transform([cleaned])

    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec)[0]

    classes = model.classes_
    ham_index = list(classes).index("ham")
    spam_index = list(classes).index("spam")

    history.append({"message": msg, "result": pred})

    spam_percent = round(float(prob[spam_index]) * 100, 2)
    ham_percent = round(float(prob[ham_index]) * 100, 2)

    return jsonify({
        "result": pred,
        "ham": float(prob[ham_index]),
        "spam": float(prob[spam_index]),
        "ham_percent": ham_percent,
        "spam_percent": spam_percent,
        "accuracy": model_accuracy,
    })


@app.route("/history")
def get_history():
    return jsonify(history[::-1])


@app.route("/clear-history", methods=["POST"])
def clear_history():
    history.clear()
    return jsonify({"status": "cleared"})


if __name__ == "__main__":
    app.run(debug=True)
