import { create } from 'zustand'

interface QRCode {
    id: string;
    data: string;
    createdAt: string;
}

interface QRState {
    qrCodes: QRCode[];
    fetchQRCodes: () => Promise<void>;
}

export const useQRStore = create<QRState>((set) => ({
    qrCodes: [],

    fetchQRCodes: async () => {
        try {
            const res = await fetch('/api/qrcodes');
            const data = await res.json();
            set({ qrCodes: data });
        } catch (err) {
            console.error("Ошибка при получении QR-кодов", err);
        }
    }
}));
