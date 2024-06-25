import React, { useEffect, useState } from "react";
import api from "../../http/index";

function UserProfile({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(`/api/history/${userId}`);
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
