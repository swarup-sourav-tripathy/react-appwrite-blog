import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button 
            onClick={logoutHandler} 
            className="inline-block px-2 py-2 text-sm md:px-6 md:py-3 duration-200 hover:bg-blue-100 rounded-full"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
