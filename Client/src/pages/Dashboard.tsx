import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setPieData(data.pie); // backend will now return only { pie }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <main
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          padding: "1.5rem",
        }}
      >
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--text)",
          paddingBottom: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Dashboard</h1>
        <p style={{ opacity: 0.7 }}>Welcome back, User!</p>
      </header>

      {/* Pie Chart */}
      <section>
        <div
          style={{
            backgroundColor: "var(--bg)",
            border: "1px solid var(--text)",
            padding: "1rem",
            borderRadius: "0.5rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {pieData && <Doughnut data={pieData} />}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Responses per Feedback
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
