import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const VerificationStatusChart = ({ data, loading }) => {
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
    labels: data?.labels || ["Valid", "Proses", "Reject"],
    datasets: [
      {
        data: data?.data || [0, 0, 0],
        backgroundColor: data?.colors || ["#27AE60", "#F2A93B", "#EB5757"],
        borderWidth: 0,
        cutout: "70%",
        borderRadius: 4,
        spacing: 2,
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
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
      },
    },
    cutout: "70%",
  };

  // Calculate total
  const total = data?.data?.reduce((a, b) => a + b, 0) || 0;

  return (
    <div className="bg-white p-4 md:p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100">
      <h3 className="text-[14px] md:text-[16px] font-bold text-[#2D2D2D] mb-4 md:mb-6">
        Status Verifikasi
      </h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
        {/* Chart Area */}
        <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] flex-shrink-0">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ) : (
            <Doughnut data={chartData} options={options} />
          )}
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl md:text-2xl font-black text-[#2D2D2D]">
              {total.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 md:gap-3 flex-1 w-full">
          {data?.labels?.map((label, index) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: data?.colors?.[index] || ["#27AE60", "#F2A93B", "#EB5757"][index],
                  }}
                ></div>
                <span className="text-xs font-medium text-gray-600">{label}</span>
              </div>
              <span className="text-xs font-bold text-gray-800">
                {data?.data?.[index]?.toLocaleString("id-ID") || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 md:gap-4">
        <div className="text-center">
          <div className="text-base md:text-lg font-black text-[#27AE60]">
            {data?.data?.[0]?.toLocaleString("id-ID") || 0}
          </div>
          <div className="text-[8px] md:text-[9px] text-gray-400 font-medium">Valid</div>
        </div>
        <div className="text-center border-l border-r border-gray-100">
          <div className="text-base md:text-lg font-black text-[#F2A93B]">
            {data?.data?.[1]?.toLocaleString("id-ID") || 0}
          </div>
          <div className="text-[8px] md:text-[9px] text-gray-400 font-medium">Proses</div>
        </div>
        <div className="text-center">
          <div className="text-base md:text-lg font-black text-[#EB5757]">
            {data?.data?.[2]?.toLocaleString("id-ID") || 0}
          </div>
          <div className="text-[8px] md:text-[9px] text-gray-400 font-medium">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusChart;

