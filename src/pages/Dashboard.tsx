// import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, History } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - QR Generator</title>
        <meta name="description" content="Quickly generate QR codes and view recent activities on your dashboard." />
      </Helmet>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Generate</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter URL or text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Generate QR Code
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent QR Codes</h2>
            <div className="space-y-2">
              <p className="text-gray-600">No recent QR codes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/generator"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <QrCode className="h-8 w-8 text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold">Create New QR Code</h3>
                <p className="text-gray-600">Generate a new customized QR code</p>
              </div>
            </div>
          </Link>

          <Link
            to="/my-codes"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <History className="h-8 w-8 text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold">View All QR Codes</h3>
                <p className="text-gray-600">Access your previously generated QR codes</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
