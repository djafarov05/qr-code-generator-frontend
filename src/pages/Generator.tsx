import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getTip } from "../api/staticApi";
import { shortenUrl } from "../api/dynamicApi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQRStore } from "../store/qrStore";
import { useUserStore } from "../store/userStore";

const Generator = () => {
  const navigate = useNavigate();
  const { createQRCode } = useQRStore();

  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrSize, setQrSize] = useState(256);
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isUrlShortened, setIsUrlShortened] = useState(false);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  useEffect(() => {
    (async () => {
      setTip(await getTip());
    })();
  }, []);

  useEffect(() => {
    setError(null);
    setIsUrlShortened(false);
    setShortenedUrl("");
  }, [qrValue]);

  const validateQRData = (d: string) => d.length <= 1273;

  const handleShortenUrl = async () => {
    if (!qrValue.startsWith("http")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    try {
      const short = await shortenUrl(qrValue);
      setShortenedUrl(short);
      setQrValue(short);
      setIsUrlShortened(true);
    } catch {
      setError("Failed to shorten URL.");
    }
  };

  const handleSaveQRCode = async () => {
    if (!qrValue) {
      setError("Enter content");
      return;
    }
    try {
      await createQRCode({
        content: qrValue,
        color: qrColor,
        size: qrSize,
        label: qrValue,
      });
      navigate("/my-codes");
    } catch {
      setError("Failed to save QR code. Please try again.");
    }
  };

  const downloadQRCode = () => {
    const imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
      qrValue
    )}&color=${qrColor.replace("#", "")}`;

    fetch(imgURL)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <>
      <Helmet>
        <title>Generate QR Code - QR Generator</title>
        <meta
          name="description"
          content="Generate and customize your QR code easily."
        />
      </Helmet>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Generate QR Code</h1>

        {tip && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">💡 Tip: {tip}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">QR Settings</h2>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>

              <input
                id="content"
                type="text"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                placeholder="Enter URL or text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              {qrValue.startsWith("http") && !isUrlShortened && (
                <button
                  onClick={handleShortenUrl}
                  className="mt-2 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
                >
                  Shorten URL
                </button>
              )}

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color
              </label>
              <input
                id="color"
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Size
              </label>
              <input
                id="size"
                type="range"
                min={128}
                max={512}
                step={32}
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">{qrSize}px</div>
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleSaveQRCode}
                disabled={!qrValue || !validateQRData(qrValue)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save QR Code
              </button>
            ) : (
              <button
                onClick={downloadQRCode}
                disabled={!qrValue || !validateQRData(qrValue)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download QR Code
              </button>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <div className="flex items-center justify-center bg-gray-50 p-4 rounded-lg">
              {qrValue ? (
                validateQRData(qrValue) ? (
                  <QRCodeCanvas
                    value={qrValue}
                    size={qrSize}
                    fgColor={qrColor}
                    level="H"
                    includeMargin
                  />
                ) : (
                  <div className="text-red-500">
                    Content is too long for QR code generation
                  </div>
                )
              ) : (
                <div className="text-gray-500">
                  Enter content to generate QR code
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generator;
