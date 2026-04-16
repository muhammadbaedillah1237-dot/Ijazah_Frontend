import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IssuanceChart = ({ data, loading }) => {
  // Get screen width to adjust chart for mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = {
    labels: data?.labels || ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penerbitan Ijazah",
        data: data?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#16c65e",
        borderRadius: 6,
        barThickness: isMobile ? 12 : 24,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // Only trigger tooltips on click, not on hover/touch to prevent issues on Android
    events: isMobile ? ['click'] : ['mousemove', 'mouseout', 'click'],
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: !isMobile,
        backgroundColor: "#1a1a1a",
        titleFont: {
          size: 12,
          weight: "bold",
        },
        bodyFont: {
          size: 11,
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 9 : 11,
            weight: "500",
          },
          color: "#828282",
          maxRotation: isMobile ? 45 : 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f0f0f0",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: isMobile ? 9 : 11,
          },
          color: "#828282",
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-6">
        <h3 className="text-[14px] md:text-[16px] font-bold text-[#2D2D2D]">
          Statistik Penerbitan Ijazah
        </h3>
        <select className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500">
          <option value="2024">2027</option>
          <option value="2023">2026</option>
          <option value="2022">2025</option>
          <option value="2022">2024</option>
          <option value="2022">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div className="h-[200px] md:h-[280px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-4 bg-teal-500 rounded-full animate-bounce"></div>
              <span className="text-xs text-gray-400 mt-2">Memuat data...</span>
            </div>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default IssuanceChart;

