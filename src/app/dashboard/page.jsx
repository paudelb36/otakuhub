"use client";

import Header from "@/components/Header";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // If no user, redirect to login
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-white">
        {!user ? (
          <p className="text-lg text-gray-600">Loading...</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard 🎉</h1>
            <p className="mb-8 text-gray-700">
              Logged in as: {user.user_metadata.username || user.email}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
