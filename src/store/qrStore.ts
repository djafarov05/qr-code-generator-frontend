import { create } from "zustand";

const API = "http://localhost:5000";

interface QRCode {
  id: number;
  content: string;
  color: string;
  size: number;
  label: string;
}

interface QRState {
  qrCodes: QRCode[];
  fetchQRCodes: () => Promise<void>;
  createQRCode: (p: { content: string; color: string; size: number; label: string }) => Promise<void>;
  deleteQRCode: (id: number) => Promise<void>;
  updateLabel:  (id: number, label: string) => Promise<void>;
}

export const useQRStore = create<QRState>((set, get) => ({
  qrCodes: [],

  fetchQRCodes: async () => {
    const r = await fetch(`${API}/api/qrcodes`, { credentials: "include" });
    set({ qrCodes: await r.json() });
  },

  createQRCode: async (p) => {
    await fetch(`${API}/api/qrcodes`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    await get().fetchQRCodes();
  },

  deleteQRCode: async (id) => {
    await fetch(`${API}/api/qrcodes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await get().fetchQRCodes();
  },

  updateLabel: async (id, label) => {
    await fetch(`${API}/api/qrcodes/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    await get().fetchQRCodes();
  },
}));
