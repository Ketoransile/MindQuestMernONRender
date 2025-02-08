import { Outlet, useLoaderData } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import useAdminStore from "../store/useAdminStore";
import { useEffect } from "react";

const AdminPage = () => {
  const initialData = useLoaderData();
  // console.log("Initial Data from Loader:", initialData);
  // console.log("INitialdaat.user", initialData.users);

  const initializeAdminData = useAdminStore(
    (state) => state.initializeAdminData
  );

  useEffect(() => {
    initializeAdminData(initialData);
  }, [initialData, initializeAdminData]);

  return (
    <div className="grid grid-cols-[220px_1fr] gap-4 p-4 bg-back">
      <AdminSidebar />
      <div className="bg-front rounded-lg pb-4 shadow min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
