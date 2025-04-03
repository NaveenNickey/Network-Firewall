import axios from "axios";

const API_URL = "http://192.168.29.87:5000"; // Change if needed

export const getFirewallStatus = async () => {
  return await axios.get(`${API_URL}/status`);
};

export const enableFirewall = async () => {
  return await axios.post(`${API_URL}/enable`);
};

export const disableFirewall = async () => {
  return await axios.post(`${API_URL}/disable`);
};

export const allowPort = async (port) => {
  return await axios.post(`${API_URL}/allow-port`, { port });
};

export const denyPort = async (port) => {
  return await axios.post(`${API_URL}/deny-port`, { port });
};

// ✅ Add these missing functions

export const getFirewallRules = async () => {
  return await axios.get(`${API_URL}/rules`);
};

export const getFirewallLogs = async () => {
  return await axios.get(`${API_URL}/logs`);
};

export const getActiveConnections = async () => {
  return await axios.get(`${API_URL}/connections`);
};

export const resetFirewall = async () => {
  return await axios.post(`${API_URL}/reset`);
};
