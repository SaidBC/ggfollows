import TasksLimit from "../../TasksLimit";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskSection() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-6 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight text-foreground">
          Create New Task
        </h1>
        <p className="text-muted-foreground text-sm">
          Setup your growth campaign and engage with our community.
        </p>
      </div>
      
      <div className="space-y-8">
        <TasksLimit />
        <CreateTaskForm />
      </div>
    </div>
  );
}
