import React, { useEffect } from "react";

const ChartIjazah = () => {
  useEffect(() => {
    const ctx = document.getElementById("chartIjazah");

    new window.Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags"],
        datasets: [
          {
            label: "Penerbitan Ijazah",
            data: [200, 350, 150, 250, 300, 180, 400, 320],
            backgroundColor: "#16a34a",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Statistik Penerbitan Ijazah Bulanan
      </h2>

      <canvas id="chartIjazah"></canvas>
    </div>
  );
};

export default ChartIjazah;
