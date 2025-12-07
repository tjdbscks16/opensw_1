// src/pages/MainPage/Details/Details.jsx
import React from "react";
import ParkingLayout from "./ParkingInfoPanel/ParkingLayout";

function Details() {
    return (
        <main className="w-full min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-6xl mx-auto">
                <ParkingLayout />
            </div>
        </main>
    );
}

export default Details;
