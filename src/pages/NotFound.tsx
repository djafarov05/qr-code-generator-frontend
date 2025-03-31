// import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - QR Generator</title>
        <meta name="description" content="Page not found." />
      </Helmet>

      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
      </div>
    </>
  );
};

export default NotFound;
