import TaskCard from "./TaskCard";

export default function TasksList() {
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
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} removeable={false} />
      ))}
    </div>
  );
}
