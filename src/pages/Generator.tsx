import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getTip } from "../api/staticApi";
import { shortenUrl } from "../api/dynamicApi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQRStore } from "../store/qrStore";
import { useUserStore } from "../store/userStore";
import { toast } from "react-toastify";
import { sendQRCodeToEmail } from "../api/api"; // 👈 добавь этот импорт

const Generator = () => {
  const navigate = useNavigate();
  const { createQRCode } = useQRStore();

  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrSize, setQrSize] = useState(256);
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isUrlShortened, setIsUrlShortened] = useState(false);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const [isSending, setIsSending] = useState(false);

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

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  const handleSendToEmail = async () => {
    if (!guestEmail) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(guestEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSending(true);
    try {
      await sendQRCodeToEmail({
        email: guestEmail,
        content: qrValue,
        color: qrColor,
        size: qrSize,
      });
      toast.success("QR code sent to your email!");
      setGuestEmail("");
      setQrValue("");
    } catch {
      toast.error("Failed to send QR code");
    } finally {
      setIsSending(false);
    }
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

        <div
          className={`grid gap-8 ${
            isLoggedIn
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 place-items-center"
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
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

            <div className="mb-4">
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

            {!isLoggedIn && (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Enter your email to receive QR"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

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
                onClick={handleSendToEmail}
                disabled={
                  !qrValue ||
                  !guestEmail ||
                  !validateQRData(qrValue) ||
                  isSending
                }
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSending ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : null}
                {isSending ? "Sending..." : "Send QR to Email"}
              </button>
            )}
          </div>

          {isLoggedIn && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Generator;
