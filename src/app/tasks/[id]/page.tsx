import Guard from "@/components/auth/Guard";
import ViewEditTask from "@/components/ViewEditTask";

export default function EditTaskPage() {
  return (
    <Guard>
      <ViewEditTask />
    </Guard>
  );
}
