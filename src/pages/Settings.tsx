// import { useState, useEffect } from "react";
// import { Save, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Helmet } from "react-helmet";

// import { useUserStore } from "../store/userStore";
// import { getProfile, updateProfile, logoutUser, deleteAccount } from "../api/api";

// const Settings = () => {
//   const navigate = useNavigate();
//   const login  = useUserStore((s) => s.login);
//   const logout = useUserStore((s) => s.logout);

//   const [name, setName]   = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const p = await getProfile();
//         setName(p.userName);
//         setEmail(p.email);
//       } catch {}
//     })();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const updated = await updateProfile({ userName: name, email });
//       login(updated);
//       toast.success("Profile updated");
//     } catch (e: any) {
//       toast.error(e.message || "Failed to update profile");
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Delete account permanently?")) return;
//     try {
//       await deleteAccount();
//       logout();
//       toast.info("Account deleted");
//       navigate("/");
//     } catch {
//       toast.error("Failed to delete account");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       logout();
//       toast.info("Logged out");
//       navigate("/");
//     } catch (e: any) {
//       toast.error(e.message || "Failed to logout");
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Settings - QR Generator</title>
//         <meta name="description" content="Update profile or delete account." />
//       </Helmet>

//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Settings</h1>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <button
//               type="submit"
//               className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//             >
//               <Save className="h-5 w-5 mr-2" />
//               Save Changes
//             </button>
//           </form>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//           <h2 className="text-xl font-semibold text-red-600 mb-4">Account deletion</h2>
//           <button
//             onClick={handleDelete}
//             className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//           >
//             <Trash2 className="h-5 w-5 mr-2" />
//             Delete Account
//           </button>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//           <h2 className="text-xl font-semibold mb-4">Logout</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Settings;
import { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

import { useUserStore } from "../store/userStore";
import {
  getProfile,
  updateProfile,
  logoutUser,
  deleteAccount,
} from "../api/api";

import { ConfirmModal } from "../components/ConfirmModal";

const Settings = () => {
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);
  const logout = useUserStore((s) => s.logout);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        setName(p.userName);
        setEmail(p.email);
      } catch {}
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateProfile({ userName: name, email });
      login(updated);
      toast.success("Profile updated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      logout();
      toast.info("Account deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setModalOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      toast.info("Logged out");
      navigate("/");
    } catch (e: any) {
      toast.error(e.message || "Failed to logout");
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - QR Generator</title>
        <meta name="description" content="Update profile or delete account." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Account deletion
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Delete Account
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Logout</h2>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Settings;
