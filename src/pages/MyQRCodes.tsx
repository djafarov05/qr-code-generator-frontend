import React from 'react';
import { Download, Pencil, Trash } from 'lucide-react';
import { Helmet } from 'react-helmet';

const MyQRCodes = () => {
  return (
    <>
      <Helmet>
        <title>My QR Codes - QR Generator</title>
        <meta name="description" content="View, edit, and download your saved QR codes." />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My QR Codes</h1>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search QR codes..."
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
            </div>
            <h3 className="font-semibold mb-2">Example QR Code</h3>
            <p className="text-sm text-gray-600 mb-4">https://example.com</p>
            <div className="flex justify-between">
              <button className="text-gray-600 hover:text-indigo-600">
                <Download className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-indigo-600">
                <Pencil className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-red-600">
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyQRCodes;
