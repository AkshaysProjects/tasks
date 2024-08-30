"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function refreshToken() {
      api
        .post("/auth/refresh", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((res) => res.data)
        .then((data) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Failed to refresh token:", error);
          setLoaded(true);
        });
    }
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) setLoaded(true);
    refreshToken();
  }, [router]);
  if (!loaded) return <Spinner />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <header className="p-4">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
      </header>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 animate-bounce">
            <Lock className="w-16 h-16 mx-auto text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4 sm:text-5xl lg:text-6xl">
            Welcome to Tasks App
          </h2>
          <p className="text-xl text-white mb-8 sm:text-2xl">
            You need to be authenticated to access our exclusive content and
            features.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/login">
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/register">
                Register
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-white">
        <p>&copy; 2023 Tasks App. All rights reserved.</p>
      </footer>
    </div>
  );
}
