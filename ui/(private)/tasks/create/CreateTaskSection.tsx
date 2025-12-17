import TasksLimit from "../../TasksLimit";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskSection() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl mt-2 mb-6 text-neutral-300">
        Create Task
      </h1>
      <TasksLimit />
      <CreateTaskForm />
    </div>
  );
}
