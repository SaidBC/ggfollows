import TaskCard from "./TaskCard";

export default function YourTasksSection() {
  const tasks = [
    {
      id: "21jndlaskm192",
      title: "Like the the post",
      description: "Just like the post",
      amount: 20,
      complated: 0,
      max: 20,
      srcImage: "/images/facebook_512x512.png",
      platformLink: "facebook.com/",
    },
  ];
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-2">
      <h1 className="font-bold text-3xl my-2 text-neutral-300">Your Tasks</h1>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} removeable={true} />
        ))}
      </div>
    </div>
  );
}
