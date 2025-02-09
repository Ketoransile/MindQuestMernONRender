import { Outlet, useLoaderData } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import useAdminStore from "../store/useAdminStore";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const AdminPage = () => {
  const initialData = useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);

  const initializeAdminData = useAdminStore(
    (state) => state.initializeAdminData
  );

  useEffect(() => {
    initializeAdminData(initialData);
  }, [initialData, initializeAdminData]);

  return (
    <div className="grid grid-cols-[220px_1fr] max-lg:flex gap-4 p-4 max-lg:pr-10 max-lg:items-center max-lg:justify-center bg-back">
      {/* Overlay for blurred background (only for max-lg) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMenuOpen(false)} // Close menu when clicking outside
          />
        )}
      </AnimatePresence>

      {/* Sidebar with Framer Motion animation (only for max-lg) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full z-50 bg-back shadow-lg lg:hidden"
          >
            {/* Close button inside the sidebar (only for max-lg) */}
            <div className="p-4 flex justify-end">
              <IoCloseCircleSharp
                className="text-white cursor-pointer hover:text-gray-900"
                size={24}
                onClick={() => setMenuOpen(false)}
              />
            </div>
            {/* Add spacing at the beginning of the menu (only for max-lg) */}
            <div className="px-4">
              <AdminSidebar
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onItemClick={() => setMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default Sidebar (for lg and above) */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Menu Toggle Button (only for max-lg) */}
      <div className="lg:hidden absolute top-2 right-2 z-30">
        {menuOpen ? (
          <IoCloseCircleSharp
            className="text-white cursor-pointer"
            size={24}
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <IoMenu
            className="text-white cursor-pointer"
            size={24}
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="bg-front rounded-lg pb-4 shadow min-h-screen max-lg:w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
