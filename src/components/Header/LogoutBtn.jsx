import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    authService.logout().then(() => {
      dispatch(logout());
    }).finally(() => {
      setLoading(false);
      setShowConfirm(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="
          px-4 py-2 
          text-sm font-medium text-red-600 
          hover:bg-red-50 rounded-lg 
          transition-all duration-200
        "
      >
        Logout
      </button>

      {/* Confirmation Modal via Portal to escape Header's css constraints */}
      {showConfirm && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to log out of your account? You will need to sign back in to create or edit posts.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={logoutHandler}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm shadow-red-600/20 disabled:opacity-50"
              >
                {loading ? "Signing out..." : "Yes, Sign Out"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default LogoutBtn;
