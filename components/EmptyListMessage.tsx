import Image from "next/image";

interface EmptyListMessageProps {
  title: string;
  description: string;
}
export default function EmptyListMessage({
  title,
  description,
}: EmptyListMessageProps) {
  return (
    <div className="flex gap-8 items-center justify-center">
      <Image
        src={"images/empty-state-illustration.svg"}
        alt="Empty state image"
        className="w-38 object-contain"
        width={152}
        height={152}
      />
      <div className="flex flex-col gap-2 ">
        <h2 className="font-bold text-3xl text-neutral-300">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
