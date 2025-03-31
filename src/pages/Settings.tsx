// // import React, { useState } from 'react';
// // import { Save } from 'lucide-react';

// // const Settings = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // TODO: Implement settings update logic
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
// //       <div className="bg-white p-6 rounded-lg shadow-md">
// //         <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //               Name
// //             </label>
// //             <input
// //               id="name"
// //               type="text"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //               Email
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// //           >
// //             <Save className="h-5 w-5" />
// //             <span>Save Changes</span>
// //           </button>
// //         </form>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow-md mt-6">
// //         <h2 className="text-xl font-semibold mb-4">Default QR Code Settings</h2>
// //         <div className="space-y-4">
// //           <div>
// //             <label htmlFor="defaultSize" className="block text-sm font-medium text-gray-700">
// //               Default Size
// //             </label>
// //             <select
// //               id="defaultSize"
// //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
// //             >
// //               <option value="256">256px</option>
// //               <option value="512">512px</option>
// //               <option value="1024">1024px</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label htmlFor="defaultColor" className="block text-sm font-medium text-gray-700">
// //               Default Color
// //             </label>
// //             <input
// //               id="defaultColor"
// //               type="color"
// //               className="mt-1 block w-full h-10"
// //               defaultValue="#000000"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow-md mt-6">
// //         <h2 className="text-xl font-semibold text-red-600 mb-4">Account deletion</h2>
// //         <button
// //           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// //         >
// //           Delete Account
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Settings;

// import React, { useState } from 'react';
// import { Save } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '../store/userStore';
// import { toast } from 'react-toastify';

// const Settings = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const logout = useUserStore((state) => state.logout);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: Implement settings update logic
//   };

//   const handleLogout = () => {
//     logout();
//     toast.info('Вы вышли из аккаунта');
//     navigate('/');
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <button
//             type="submit"
//             className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//           >
//             <Save className="h-5 w-5" />
//             <span>Save Changes</span>
//           </button>
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//         <h2 className="text-xl font-semibold text-red-600 mb-4">Account deletion</h2>
//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//         >
//           Delete Account
//         </button>
//       </div>

//       {/* === LOGOUT === */}
//       <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Logout</h2>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//         >
//           Logout
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const Settings = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated locally!');
  };

  const handleLogout = () => {
    logout();
    toast.info('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Settings - QR Generator</title>
        <meta name="description" content="Update your user profile, manage default QR code settings, and more." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Account deletion</h2>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Logout</h2>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
