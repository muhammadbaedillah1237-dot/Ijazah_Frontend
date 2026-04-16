import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import ijazahBg from "../assets/img/ijazah.jpeg";

const Template = () => {
  const [editMode, setEditMode] = useState(true);

  const [template, setTemplate] = useState({
    background: ijazahBg,
    elements: [
      { id: "nama", label: "Nama Lengkap", x: 400, y: 250 },
      { id: "nim", label: "NIM", x: 400, y: 300 },
    ],
  });

  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // DRAG START
  const handleMouseDown = (e, id) => {
    if (!editMode) return;

    const el = template.elements.find((el) => el.id === id);

    setDragging(id);
    setOffset({
      x: e.clientX - el.x,
      y: e.clientY - el.y,
    });
  };

  // DRAG MOVE
  const handleMouseMove = (e) => {
    if (!dragging) return;

    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === dragging
          ? {
              ...el,
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            }
          : el
      ),
    }));
  };

  // DRAG END
  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // TAMBAH FIELD
  const addField = (label) => {
    setTemplate({
      ...template,
      elements: [
        ...template.elements,
        {
          id: Date.now(),
          label,
          x: 200,
          y: 200,
        },
      ],
    });
  };

  return (
    <DashboardLayout>
      {/* HEADER (SAMA STYLE DASHBOARD) */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tight">
          Manajemen Template Ijazah
        </h1>
        <p className="text-gray-400 text-xs italic mt-1 font-medium">
          Atur posisi field ijazah dengan drag & drop
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR */}
        <div className="bg-white rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5">
          <h3 className="font-bold text-[#2D2D2D] mb-4">
            Field Data
          </h3>

          {[
            "Nama Lengkap",
            "NIM",
            "Fakultas",
            "Program Studi",
            "Tahun Lulus",
            "IPK",
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => addField(item)}
              className="p-2 mb-2 bg-[#F2F2F2] rounded cursor-pointer hover:bg-gray-200 text-sm"
            >
              + {item}
            </div>
          ))}

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 w-full bg-[#2D9CDB] text-white py-2 rounded text-sm font-bold"
          >
            {editMode ? "Mode Edit" : "Mode View"}
          </button>
        </div>

        {/* CANVAS */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 overflow-auto">
            
            <div className="relative border rounded-lg overflow-hidden">
              
              {/* BACKGROUND */}
              <img
                src={template.background}
                alt="ijazah"
                className="w-full"
              />

              {/* ELEMENT */}
              {template.elements.map((el) => (
                <div
                  key={el.id}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  className={`absolute px-2 py-1 text-sm font-bold ${
                    editMode
                      ? "bg-[#2D9CDB] text-white cursor-move"
                      : "text-black"
                  }`}
                  style={{
                    left: el.x,
                    top: el.y,
                  }}
                >
                  {el.label}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Template;