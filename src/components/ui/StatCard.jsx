import React from "react";

const StatCard = ({ title, value, sub, subColor, icon, trend }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex justify-between items-start">
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </p>
      <h2 className="text-2xl font-black text-gray-800 mt-1">
        {value?.toLocaleString("id-ID") || "0"}
      </h2>
      {sub && (
        <p className={`text-[9px] font-bold mt-4 ${subColor || "text-gray-400"}`}>
          {sub}
        </p>
      )}
      {trend !== undefined && (
        <p className={`text-[9px] font-bold mt-2 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% dari bulan lalu
        </p>
      )}
    </div>
    <div className="text-2xl p-2 bg-gray-50 rounded-xl">{icon || "📊"}</div>
  </div>
);

export default StatCard;

