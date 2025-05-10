"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RuleBuilder from "@/components/RuleBuilder";

export default function HomePage() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUserId(session.user.id); // or `email`, or whatever identifier you use
        console.log("User ID:", session.user.id);
      } else {
        console.log("No session found");
      }
    };

    fetchSession();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Campaign Segment</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <RuleBuilder userId={userId} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
