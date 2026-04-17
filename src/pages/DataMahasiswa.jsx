import React, { useState } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";

const DataMahasiswa = () => {
  const [search, setSearch] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [tahun, setTahun] = useState("");
  const [batch, setBatch] = useState("");

  // DATA STATIS
  const data = [
    { nama: "Adi Saputra", nim: "231106040902", fakultas: "FTS", prodi: "Teknik Informatika", tahun: "2026", batch: "Batch 1", status: "Proses" },
    { nama: "Rani Maharani", nim: "231106040903", fakultas: "FEB", prodi: "Akuntansi", tahun: "2026", batch: "Batch 2", status: "Proses" },
    { nama: "Budi Pratama", nim: "231106040910", fakultas: "FEB", prodi: "Bisnis Digital", tahun: "2025", batch: "Batch 3", status: "Proses" },
    { nama: "Kayla Key", nim: "231106040912", fakultas: "FH", prodi: "Ilmu Hukum", tahun: "2025", batch: "Batch 1", status: "Proses" },
    { nama: "Rizky Gusti A", nim: "231106040839", fakultas: "FTS", prodi: "Teknik Informatika", tahun: "2024", batch: "Batch 4", status: "Proses" },
  ];

  // 🔥 GENERATE TAHUN (tahun lalu - sekarang)
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear];

  // 🔥 GENERATE BATCH 1 - 10
  const batches = Array.from({ length: 10 }, (_, i) => `Batch ${i + 1}`);

  // 🔥 FILTER DATA
  const filtered = data.filter((item) => {
    return (
      (item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.nim.includes(search)) &&
      (fakultas ? item.fakultas === fakultas : true) &&
      (tahun ? item.tahun === tahun : true) &&
      (batch ? item.batch === batch : true)
    );
  });

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2D2D2D]">
          Manajemen Data Mahasiswa
        </h1>
        <p className="text-gray-400 text-sm">
          Melihat data yang sedang di proses validasi
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 items-center">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari: Nama, NIM, Prodi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#EDEDED] outline-none w-64 text-sm"
        />

        {/* FAKULTAS */}
        <select
          value={fakultas}
          onChange={(e) => setFakultas(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#EDEDED] text-sm"
        >
          <option value="">Semua Fakultas</option>
          <option value="FAI">FAI</option>
          <option value="FKIP">FKIP</option>
          <option value="FEB">FEB</option>
          <option value="FH">FH</option>
          <option value="FTS">FTS</option>
          <option value="FIKES">FIKES</option>
        </select>

        {/* TAHUN LULUS */}
        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#EDEDED] text-sm"
        >
          <option value="">Tahun Lulus</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* BATCH */}
        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#EDEDED] text-sm"
        >
          <option value="">Semua Batch</option>
          {batches.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#EFEFEF] text-[#828282] text-sm">
              <th className="p-4">No.</th>
              <th className="p-4">Nama</th>
              <th className="p-4">NIM</th>
              <th className="p-4">Fakultas</th>
              <th className="p-4">Program Studi</th>
              <th className="p-4">Tahun Lulus</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-semibold">{item.nama}</td>
                <td className="p-4">{item.nim}</td>
                <td className="p-4">{item.fakultas}</td>
                <td className="p-4">{item.prodi}</td>
                <td className="p-4">{item.tahun}</td>
                
                <td className="p-4 text-center">
                  <span className="bg-[#2D9CDB] text-white px-3 py-1 rounded-full text-xs">
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  🔍
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-2 p-4">
          <button className="px-3 py-1 border rounded">{"<"}</button>
          <button className="px-3 py-1 bg-green-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">{">"}</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataMahasiswa;