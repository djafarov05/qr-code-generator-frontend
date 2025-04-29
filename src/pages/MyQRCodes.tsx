import { useEffect, useState } from "react";
import { Download, Pencil, Trash, Save } from "lucide-react";
import { Helmet } from "react-helmet";
import { useQRStore } from "../store/qrStore";

const MyQRCodes = () => {
  const { qrCodes, fetchQRCodes, deleteQRCode, updateLabel } = useQRStore();
  const [editId, setEditId] = useState<number | null>(null);
  const [tempLabel, setTempLabel] = useState("");

  useEffect(() => {
    fetchQRCodes();
  }, [fetchQRCodes]);

  const startEdit = (id: number, current: string) => {
    setEditId(id);
    setTempLabel(current);
  };

  const saveEdit = async (id: number) => {
    await updateLabel(id, tempLabel);
    setEditId(null);
  };

  const download = (c: typeof qrCodes[number]) => {
    const imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=${c.size}x${c.size}&data=${encodeURIComponent(
      c.content
    )}&color=${c.color.replace("#", "")}`;
    const a = document.createElement("a");
    a.href = imgURL;
    a.download = "qr.png";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>My QR Codes - QR Generator</title>
        <meta
          name="description"
          content="View, edit, and download your saved QR codes."
        />
      </Helmet>

      <h1 className="text-2xl font-bold mb-6">My QR Codes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-32 h-32 mx-auto mb-4"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=${c.size}x${c.size}&data=${encodeURIComponent(
                c.content
              )}&color=${c.color.replace("#", "")}`}
              alt="qr"
            />

            {editId === c.id ? (
              <input
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
              />
            ) : (
              <h3 className="font-semibold mb-2 break-all">{c.label}</h3>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => download(c)}
                className="text-gray-600 hover:text-indigo-600"
              >
                <Download className="h-5 w-5" />
              </button>

              {editId === c.id ? (
                <button
                  onClick={() => saveEdit(c.id)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Save className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(c.id, c.label)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => deleteQRCode(c.id)}
                className="text-gray-600 hover:text-red-600"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyQRCodes;
