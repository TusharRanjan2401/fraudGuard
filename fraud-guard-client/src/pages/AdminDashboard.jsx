import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/alerts/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlerts(response.data);
    } catch (err) {
      
    }
  };

  useEffect(() => {
    fetchAlerts();

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/alerts", (message) => {
        const data = JSON.parse(message.body);
        setAlerts((prev) => [data, ...prev]);
      });
      };
      
       client.onConnect = () => {
      client.subscribe("/topic/nonfraud", (message) => {
        const data = JSON.parse(message.body);
        setAlerts((prev) => [data, ...prev]);
      });
    };

    client.activate();
    return () => client.deactivate();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-300 p-6">
        <h2 className="text-3xl font-bold mb-6">Admin Alerts</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Cards for stats */}
          <div className="bg-red-100 p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Fraud Transactions</h3>
            <p className="text-red-600 font-bold text-2xl">
              {alerts.filter((tx) => tx.status === "FRAUD").length}
            </p>
          </div>
          <div className="bg-green-100 p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Safe Transactions</h3>
            <p className="text-green-600 font-bold text-2xl">
              {alerts.filter((tx) => tx.status === "SAFE").length}
            </p>
          </div>
          <div className="bg-blue-200 p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Total Alerts</h3>
            <p className="text-blue-600 font-bold text-2xl">{alerts.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Sender</th>
                <th className="py-2 px-4">Receiver</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((tx) => (
                <tr
                  key={tx.id}
                  className={
                    tx.status === "FRAUD" ? "bg-red-100" : "bg-green-50"
                  }
                >
                  <td className="py-2 px-4">{tx.senderAccount}</td>
                  <td className="py-2 px-4">{tx.receiverAccount}</td>
                  <td className="py-2 px-4">${tx.amount}</td>
                  <td
                    className={`py-2 px-4 font-bold ${
                      tx.status === "FRAUD"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.status}
                  </td>
                  <td className="py-2 px-4">
                    {tx.createdAt
                      ? new Date(tx.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
