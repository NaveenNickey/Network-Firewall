import React, { useState, useEffect } from "react";
import {
  getFirewallStatus,
  getFirewallRules,
  getFirewallLogs,
  getActiveConnections,
  enableFirewall,
  disableFirewall,
  allowPort,
  denyPort,
  resetFirewall,
} from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirewallGraph from "./FirewallGraph";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Loading...");
  const [rules, setRules] = useState("");
  const [logs, setLogs] = useState("");
  const [connections, setConnections] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    fetchFirewallData();
  }, []);

  const fetchFirewallData = async () => {
    try {
      const statusRes = await getFirewallStatus();
      setStatus(statusRes.data.status);

      const rulesRes = await getFirewallRules();
      setRules(rulesRes.data.rules);

      const logsRes = await getFirewallLogs();
      setLogs(logsRes.data.logs);

      const connRes = await getActiveConnections();
      setConnections(connRes.data.connections);
    } catch (error) {
      toast.error("Error fetching firewall data.");
    }
  };

  const handleEnable = async () => {
    try {
      await enableFirewall();
      toast.success("Firewall enabled!");
      fetchFirewallData();
    } catch {
      toast.error("Failed to enable firewall.");
    }
  };

  const handleDisable = async () => {
    try {
      await disableFirewall();
      toast.success("Firewall disabled!");
      fetchFirewallData();
    } catch {
      toast.error("Failed to disable firewall.");
    }
  };

  const handleAllowPort = async () => {
    if (!port) return toast.error("Enter a port number!");
    try {
      await allowPort(port);
      toast.success(`Port ${port} allowed!`);
      setPort("");
      fetchFirewallData();
    } catch {
      toast.error("Failed to allow port.");
    }
  };

  const handleDenyPort = async () => {
    if (!port) return toast.error("Enter a port number!");
    try {
      await denyPort(port);
      toast.success(`Port ${port} denied!`);
      setPort("");
      fetchFirewallData();
    } catch {
      toast.error("Failed to deny port.");
    }
  };

  const handleReset = async () => {
    try {
      await resetFirewall();
      toast.success("Firewall reset!");
      fetchFirewallData();
    } catch {
      toast.error("Failed to reset firewall.");
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Firewall Info</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Rules:</strong> <pre>{rules}</pre></p>
        <p><strong>Logs:</strong> <pre>{logs}</pre></p>
        <p><strong>Active Connections:</strong> <pre>{connections}</pre></p>
        <button onClick={handleReset}>Reset Firewall</button>
      </aside>

      <main className="content">
        <h1>Firewall Control Panel</h1>
        <div className="buttons">
          <button onClick={handleEnable}>Enable Firewall</button>
          <button onClick={handleDisable}>Disable Firewall</button>
        </div>

        <div className="port-controls">
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder="Enter Port Number"
          />
          <button onClick={handleAllowPort}>Allow Port</button>
          <button onClick={handleDenyPort}>Deny Port</button>
        </div>

        {/* Firewall Graph */}
        <FirewallGraph />

        {/* About Firewall Section */}
        <div className="about-firewall">
          <h2>About Network Firewalls</h2>
          <p>
            A firewall is a security system that monitors and controls incoming and outgoing network traffic
            based on security rules. It acts as a barrier between a trusted internal network and untrusted external networks, protecting systems from unauthorized access and cyber threats.
          </p>

          <h3>Types of Firewalls</h3>
          <ul>
            <li><strong>Packet Filtering Firewalls:</strong> Controls network access by monitoring packets and filtering based on IP addresses, protocols, and ports.</li>
            <li><strong>Stateful Inspection Firewalls:</strong> Tracks active connections and ensures packets belong to a valid session.</li>
            <li><strong>Proxy Firewalls:</strong> Acts as an intermediary, filtering and controlling requests between a client and a server.</li>
            <li><strong>Next-Generation Firewalls (NGFW):</strong> Includes advanced features like application awareness, intrusion prevention, and cloud-based security intelligence.</li>
          </ul>

          <h3>How to Prevent Network Traffic?</h3>
          <p>
            A network firewall applies a set of rules to monitor traffic. If the traffic aligns with the rules, it is allowed; otherwise, it is blocked to ensure security.
          </p>

          <h3>Which Firewall Architecture is Best?</h3>
          <p>
            The best firewall architecture depends on use cases, threats, and budget. If threats target the application layer, an Application Layer Firewall is best. If threats occur at the session layer, Circuit-Level Gateways can be ideal.
          </p>

          <h3>Advantages of Firewalls</h3>
          <ul>
            <li><strong>Monitors Network Traffic:</strong> Inspects packets to keep malicious content out.</li>
            <li><strong>Prevents Hacking:</strong> Blocks unauthorized access attempts.</li>
            <li><strong>Stops Viruses:</strong> Protects from malware and harmful threats.</li>
            <li><strong>Enhances Security:</strong> Provides a robust defense against cyber threats.</li>
            <li><strong>Increases Privacy:</strong> Ensures confidential data stays secure.</li>
          </ul>

          <h3>Disadvantages of Firewalls</h3>
          <ul>
            <li><strong>Cost:</strong> Hardware firewalls can be expensive.</li>
            <li><strong>Restricts Users:</strong> Strict security can limit operations in large organizations.</li>
            <li><strong>Slows Network:</strong> Monitoring all traffic may reduce speed.</li>
            <li><strong>Maintenance:</strong> Requires regular updates to remain effective.</li>
          </ul>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;
