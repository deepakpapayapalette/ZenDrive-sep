import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const backFun = () => navigate(-1);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

            <h1 style={{ color: "red", fontSize: "4rem" }}>404</h1>
            <h2 className="text-2xl font-bold mb-4">PAGE NOT FOUND</h2>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
            <div className="space-x-4">
                <NavLink to="/" className="text-blue-600 hover:text-blue-800 underline">
                    Back to Home
                </NavLink>
                <button
                    className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={backFun}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
