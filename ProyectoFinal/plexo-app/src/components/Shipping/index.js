import React, { useEffect, useState } from "react";
import axios from "axios";
import Shipping from "../Shipping/index";

function UserProfile({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/users/loginuser${userId}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>History</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry.id}>
            {}
            {entry.description} - {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
