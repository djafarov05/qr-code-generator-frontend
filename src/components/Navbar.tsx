// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { QrCode, Settings, User } from 'lucide-react';

// // const Navbar = () => {
// //   return (
// //     <nav className="bg-white shadow-lg">
// //       <div className="container mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">
// //           <Link to="/" className="flex items-center space-x-2">
// //             <QrCode className="h-8 w-8 text-indigo-600" />
// //             <span className="text-xl font-bold text-gray-800">QR Generator</span>
// //           </Link>
          
// //           <div className="flex items-center space-x-4">
// //             <Link to="/generator" className="text-gray-600 hover:text-indigo-600">
// //               Generate QR
// //             </Link>
// //             <Link to="/my-codes" className="text-gray-600 hover:text-indigo-600">
// //               My QR Codes
// //             </Link>
// //             <Link to="/settings" className="text-gray-600 hover:text-indigo-600">
// //               <Settings className="h-5 w-5" />
// //             </Link>
// //             <Link to="/login" className="text-gray-600 hover:text-indigo-600">
// //               <User className="h-5 w-5" />
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { QrCode, Settings, User } from 'lucide-react';
// import { useUserStore } from '../store/userStore'; // подключаем store

// const Navbar = () => {
//   const isLoggedIn = useUserStore((state) => state.isUserLoggedIn());

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <QrCode className="h-8 w-8 text-indigo-600" />
//             <span className="text-xl font-bold text-gray-800">QR Generator</span>
//           </Link>

//           <div className="flex items-center space-x-4">
//             <Link to="/generator" className="text-gray-600 hover:text-indigo-600">
//               Generate QR
//             </Link>

//             {/* Показываем только если пользователь залогинен */}
//             {isLoggedIn && (
//               <Link to="/my-codes" className="text-gray-600 hover:text-indigo-600">
//                 My QR Codes
//               </Link>
//             )}

//             {isLoggedIn && (
//               <Link to="/settings" className="text-gray-600 hover:text-indigo-600">
//                 <Settings className="h-5 w-5" />
//               </Link>
//             )}

//             <Link to="/login" className="text-gray-600 hover:text-indigo-600">
//               <User className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Settings, User } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const isLoggedIn = useUserStore((state) => state.isUserLoggedIn());
  const user = useUserStore((state) => state.user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">QR Generator</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/generator" className="text-gray-600 hover:text-indigo-600">
              Generate QR
            </Link>

            {isLoggedIn && (
              <Link to="/my-codes" className="text-gray-600 hover:text-indigo-600">
                My QR Codes
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/settings" className="text-gray-600 hover:text-indigo-600">
                <Settings className="h-5 w-5" />
              </Link>
            )}

            {/* 👇 Выводим приветствие */}
            {isLoggedIn ? (
              <span className="text-sm text-gray-600">
                Hey! {user?.name}
              </span>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
