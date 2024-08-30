import Guard from "@/components/auth/Guard";
import CreateTask from "@/components/CreateTask";

export default function EditTaskPage() {
  return (
    <Guard>
      <CreateTask />
    </Guard>
  );
}
