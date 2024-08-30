import Guard from "@/components/auth/Guard";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <Guard>
      <Dashboard />
    </Guard>
  );
}
