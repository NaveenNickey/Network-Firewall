import subprocess
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status', methods=['GET'])
def get_status():
    result = subprocess.run(['sudo', 'ufw', 'status'], capture_output=True, text=True)
    return jsonify({"status": result.stdout.strip()})

@app.route('/rules', methods=['GET'])
def get_firewall_rules():
    result = subprocess.run(['sudo', 'ufw', 'status', 'numbered'], capture_output=True, text=True)
    return jsonify({"rules": result.stdout.strip()})

@app.route('/logs', methods=['GET'])
def get_firewall_logs():
    result = subprocess.run(['sudo', 'journalctl', '-u', 'ufw', '--no-pager'], capture_output=True, text=True)
    return jsonify({"logs": result.stdout.strip()})

@app.route('/connections', methods=['GET'])
def get_active_connections():
    result = subprocess.run(['ss', '-tuln'], capture_output=True, text=True)
    return jsonify({"connections": result.stdout.strip()})

@app.route('/allow-port', methods=['POST'])
def allow_port():
    data = request.json
    port = data.get('port')
    if not port:
        return jsonify({"error": "Port number required"}), 400
    result = subprocess.run(['sudo', 'ufw', 'allow', str(port)], capture_output=True, text=True)
    return jsonify({"message": result.stdout.strip()})

@app.route('/deny-port', methods=['POST'])
def deny_port():
    data = request.json
    port = data.get('port')
    if not port:
        return jsonify({"error": "Port number required"}), 400
    result = subprocess.run(['sudo', 'ufw', 'deny', str(port)], capture_output=True, text=True)
    return jsonify({"message": result.stdout.strip()})

@app.route('/enable', methods=['POST'])
def enable_ufw():
    result = subprocess.run(['sudo', 'ufw', 'enable'], capture_output=True, text=True)
    return jsonify({"message": result.stdout.strip()})

@app.route('/disable', methods=['POST'])
def disable_ufw():
    result = subprocess.run(['sudo', 'ufw', 'disable'], capture_output=True, text=True)
    return jsonify({"message": result.stdout.strip()})

@app.route('/reset', methods=['POST'])
def reset_firewall():
    result = subprocess.run(['sudo', 'ufw', 'reset'], capture_output=True, text=True)
    return jsonify({"message": result.stdout.strip()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
