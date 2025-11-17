import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskSection() {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-2 mb-6 text-neutral-300">
        Create Task
      </h1>
      <CreateTaskForm />
    </div>
  );
}
