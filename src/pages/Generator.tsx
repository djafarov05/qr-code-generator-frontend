import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getTip } from '../api/staticApi';
import { shortenUrl } from '../api/dynamicApi';
// import { databaseApi } from '../api/databaseApi';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Generator = () => {
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [qrSize, setQrSize] = useState(256);
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [isUrlShortened, setIsUrlShortened] = useState(false);

  useEffect(() => {
    const loadTip = async () => {
      const randomTip = await getTip();
      setTip(randomTip);
    };
    loadTip();
  }, []);

  useEffect(() => {
    setError(null);
    setIsUrlShortened(false);
    setShortenedUrl('');
  }, [qrValue]);

  const validateQRData = (data: string) => {
    return data.length <= 1273;
  };

  const handleShortenUrl = async () => {
    try {
      if (!qrValue.startsWith('http')) {
        setError('Please enter a valid URL starting with http:// or https://');
        return;
      }
      const shortened = await shortenUrl(qrValue);
      setShortenedUrl(shortened);
      setQrValue(shortened);
      setIsUrlShortened(true);
    } catch (error) {
      setError('Failed to shorten URL, make sure you are not trying to shorten already shortened link.');
    }
  };

  const handleSaveQRCode = async () => {
    try {
      // await databaseApi.createQRCode({
      //   content: qrValue,
      //   shortened_url: shortenedUrl,
      //   color: qrColor,
      //   size: qrSize
      // });
      navigate('/my-codes');
    } catch (error) {
      setError('Failed to save QR code. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Generate QR Code - QR Generator</title>
        <meta name="description" content="Generate and customize your QR code easily." />
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
            <div className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <div className="space-y-2">
                  <input
                    id="content"
                    type="text"
                    value={qrValue}
                    onChange={(e) => setQrValue(e.target.value)}
                    placeholder="Enter URL or text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {qrValue.startsWith('http') && !isUrlShortened && (
                    <button
                      onClick={handleShortenUrl}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
                    >
                      Shorten URL
                    </button>
                  )}
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
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

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <input
                  id="size"
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">{qrSize}px</div>
              </div>

              <button
                onClick={handleSaveQRCode}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Save QR Code
              </button>
            </div>
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
                <div className="text-gray-500">Enter content to generate QR code</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generator;
