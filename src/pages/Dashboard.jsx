import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import IssuanceChart from "../components/ui/IssuanceChart";
import VerificationStatusChart from "../components/ui/VerificationStatusChart";
import { getStatistics, getMonthlyIssuance, getVerificationStatus, getIjazahList } from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [ijazahList, setIjazahList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Original sample data
  const originalData = [
    { n: "Adi Saputra", npm: "2011080518", p: "Teknik Informatika", t: "2024", s: "Valid", c: "bg-[#F39191]", ini: "AS" },
    { n: "Rani Maharani", npm: "2211080518", p: "Akuntansi", t: "2026", s: "Proses", c: "bg-[#8BC9F3]", ini: "RM" },
    { n: "Budi Pratama", npm: "1811080518", p: "Manajemen Bisnis", t: "2022", s: "Valid", c: "bg-[#E691F3]", ini: "BP" },
    { n: "Kayla Kay", npm: "2011080518", p: "Ilmu Hukum", t: "2024", s: "Reject", c: "bg-[#91F3A0]", ini: "KK" },
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

useEffect(() => {
    const dataToFilter = ijazahList.length > 0 ? ijazahList : originalData;
    let filtered = dataToFilter;
    
    if (searchQuery.trim()) {
      filtered = dataToFilter.filter(item =>
        item.n?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim?.includes(searchQuery) ||
        item.p?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  }, [ijazahList, searchQuery, originalData]);

  const fetchAllData = async () => {
    console.log('Dashboard fetchAllData called');
    setLoading(true);
    try {
      const [statsData, monthlyDataResult, verificationDataResult, ijazahData] = 
        await Promise.all([
          getStatistics(),
          getMonthlyIssuance(),
          getVerificationStatus(),
          getIjazahList()
        ]);
      
      console.log('API data loaded:', {statsData, monthlyDataResult, verificationDataResult, ijazahData});
      setStats(statsData);
      setMonthlyData(monthlyDataResult);
      setVerificationData(verificationDataResult);
      const apiData = ijazahData.data || [];
      setIjazahList(apiData);
      setFilteredData(apiData.length > 0 ? apiData : originalData);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setFilteredData(originalData);
      setStats({
        totalIjazahTerbit: 12543,
        permintaanVerifikasi: 451,
        dataReject: 42,
        dataRevoke: 17
      });
      setMonthlyData({
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
        data: [200, 350, 150, 250, 380, 180, 450, 300, 320, 280, 400, 350],
      });
      setVerificationData({
        labels: ["Valid", "Proses", "Reject"],
        data: [1250, 320, 42],
        colors: ["#27AE60", "#F2A93B", "#EB5757"]
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle search - optimized to prevent UI blinking
  const handleSearch = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
  }, []);

// Fixed broken search useEffect - removed incomplete code

  // Get current date for display
  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <DashboardLayout>
      <header className="mb-10">
        <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tight">
          Ringkasan Statistik
        </h1>
        <p className="text-gray-400 text-xs italic mt-1 font-medium">
          Update terakhir: {currentDate} WIB
        </p>
      </header>

     {/* STAT CARDS SECTION */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {/* Kartu 1: Terbit */}
  <StatCard
    title="Jumlah Ijazah Terbit"
    value={stats?.totalIjazahTerbit || 12543}
    sub="20 Ijazah Terbit Minggu ini"
    subColor="text-green-500"
    icon="🎓"
  />

  {/* Kartu 2: Proses */}
  <StatCard
    title="Jumlah Ijazah di Proses"
    value={stats?.permintaanVerifikasi || 451}
    sub="12 di Proses Minggu ini"
    subColor="text-blue-500"
    icon="✅"
  />

  {/* Kartu 3: Reject */}
  <StatCard
    title="Jumlah Ijazah di Reject"
    value={stats?.dataReject || 42}
    sub="2 Data di Reject Minggu ini"
    subColor="text-red-500"
    icon="❌"
  />

  {/* Kartu 4: Revoke */}
  <StatCard
    title="Jumlah Ijazah di Revoke"
    value={stats?.dataRevoke || 17}
    sub="Tidak ada perubahan Minggu ini"
    subColor="text-orange-400"
    icon="📋"
  />
</div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <IssuanceChart data={monthlyData} loading={loading} />
        </div>
        <div>
          <VerificationStatusChart data={verificationData} loading={loading} />
        </div>
      </div>

      {/* TABLE SECTION SESUAI FIGMA */}
      <div className="bg-white rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mt-10">
        <div className="p-4 md:p-8">
          {/* Header Tabel: Judul & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10 px-2">
            <h2 className="font-bold text-[#2D2D2D] text-lg md:text-2xl tracking-tight">
              Status Verifikasi Ijazah Mahasiswa
            </h2>

            {/* Input Search dengan shadow-inner dan warna sesuai Figma */}
            <div className="relative group w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari: Nama, NPM.."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full md:w-80 pl-12 pr-4 py-3 bg-[#EDEDED] rounded-[8px] text-sm text-gray-500 italic outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border-none focus:ring-1 focus:ring-gray-200 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Area Tabel - Hidden on mobile, show card view on mobile */}
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {/* Header dengan background abu dan border biru tebal di bawah sesuai gambar */}
                <tr className="bg-[#EFEFEF] border-x-2 border-t-2 border-b-4 border-b-[#2D9CDB] border-x-[#2D9CDB] border-t-[#2D9CDB]">
                  <th className="px-4 lg:px-8 py-5 text-[14px] font-bold text-[#828282]">
                    Nama Mahasiswa
                  </th>
                  <th className="px-4 lg:px-8 py-5 text-[14px] font-bold text-[#828282] text-center">
                    NPM
                  </th>
                  <th className="px-4 lg:px-8 py-5 text-[14px] font-bold text-[#828282] text-center">
                    Program Studi
                  </th>
                  <th className="px-4 lg:px-8 py-5 text-[14px] font-bold text-[#828282] text-center">
                    Tahun Lulus
                  </th>
                  <th className="px-4 lg:px-8 py-5 text-[14px] font-bold text-[#828282] text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="border-x-2 border-b-2 border-[#E0E0E0]">
                {filteredData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#F2F2F2] last:border-none hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 lg:px-8 py-4 lg:py-6 flex items-center gap-3 lg:gap-5">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${row.c || "bg-gray-300"} flex items-center justify-center text-white font-bold text-[12px] lg:text-[14px] shadow-sm flex-shrink-0`}
                      >
                        {row.ini || (row.n || row.nama || "").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-[#2D2D2D] text-[14px] lg:text-[15px]">
                        {row.n || row.nama}
                      </span>
                    </td>
                    <td className="px-4 lg:px-8 py-4 lg:py-6 text-[14px] lg:text-[15px] font-bold text-[#2D2D2D] text-center font-mono">
                      {row.npm}
                    </td>
                    <td className="px-4 lg:px-8 py-4 lg:py-6 text-[14px] lg:text-[15px] font-bold text-[#2D2D2D] text-center">
                      {row.p || row.prodi}
                    </td>
                    <td className="px-4 lg:px-8 py-4 lg:py-6 text-[14px] lg:text-[15px] font-bold text-[#2D2D2D] text-center">
                      {row.t || row.tahunLulus}
                    </td>
                    <td className="px-4 lg:px-8 py-4 lg:py-6 text-center">
                      <span
                        className={`inline-block w-20 lg:w-28 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-[12px] font-bold text-white uppercase tracking-tighter ${
                          (row.s || row.status) === "Valid"
                            ? "bg-[#27AE60]"
                            : (row.s || row.status) === "Proses"
                              ? "bg-[#F2A93B]"
                              : "bg-[#EB5757]"
                        }`}
                      >
                        {row.s || row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredData.map((row, i) => (
              <div
                key={i}
                className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full ${row.c || "bg-gray-300"} flex items-center justify-center text-white font-bold text-[12px] shadow-sm flex-shrink-0`}
                  >
                    {row.ini || (row.n || row.nama || "").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] text-[14px]">
                      {row.n || row.nama}
                    </p>
                    <p className="text-[12px] text-[#828282] font-mono">
                      {row.npm}
                    </p>
                  </div>
                  <span
                    className={`ml-auto inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase ${
                      (row.s || row.status) === "Valid"
                        ? "bg-[#27AE60]"
                        : (row.s || row.status) === "Proses"
                          ? "bg-[#F2A93B]"
                          : "bg-[#EB5757]"
                    }`}
                  >
                    {row.s || row.status}
                  </span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#828282]">Program Studi</span>
                  <span className="font-bold text-[#2D2D2D]">{row.p || row.prodi}</span>
                </div>
                <div className="flex justify-between text-[12px] mt-1">
                  <span className="text-[#828282]">Tahun Lulus</span>
                  <span className="font-bold text-[#2D2D2D]">{row.t || row.tahunLulus}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 italic">Data tidak ditemukan</p>
            </div>
          )}

          {/* PAGINATION SESUAI FIGMA */}
          <div className="mt-6 md:mt-10 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
            <p className="text-[13px] text-[#BDBDBD] font-medium italic text-center md:text-left">
              Menampilkan {filteredData.length} dari {stats?.totalIjazahTerbit || 346} permintaan
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-3 md:px-5 py-2 md:py-2.5 border border-[#E0E0E0] rounded-[8px] text-[12px] md:text-[13px] font-bold text-[#828282] hover:bg-gray-50 transition-all"
              >
                Sebelumnya
              </button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#27AE60] text-white rounded-[4px] text-xs md:text-sm font-bold shadow-lg shadow-green-100 transition-all active:scale-95">
                {currentPage}
              </button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 md:px-5 py-2 md:py-2.5 border border-[#E0E0E0] rounded-[8px] text-[12px] md:text-[13px] font-bold text-[#2D2D2D] hover:bg-gray-50 transition-all"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

