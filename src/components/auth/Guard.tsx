"use client";

import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Guard({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function refreshToken() {
      const { access_token, refresh_token } = await api
        .post("/auth/refresh", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((res) => res.data);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      setLoaded(true);
    }
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) router.push("/login");
    refreshToken();
  }, [router]);
  if (!loaded) return <Spinner />;
  return <>{children}</>;
}
