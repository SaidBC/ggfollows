import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center  justify-between gap-12">
      <div className="flex flex-col gap-6 text-center lg:text-start items-center lg:items-start">
        <div>
          <div className="flex items-center gap-2 ">
            <span className="text-4xl lg:text-4xl">Welcome to </span>
            <Logo className="rotate-3" />
          </div>
          <p>Let’s Grow Together!</p>
        </div>
        <p className="text-sm max-w-md text-muted-foreground">
          Sign up today and enjoy{" "}
          <b className="text-secondary">100 free points</b> to kickstart your
          journey. Follow others, earn more, and watch your followers grow{" "}
          <br /> no bots, just real people helping each other.
        </p>
        <Button variant={"secondary"} size="lg" asChild>
          <Link href={"/auth/signup"}>Get Started</Link>
        </Button>
      </div>
      <div className="p-8">
        <Image
          src={"/images/hero-illustration.svg"}
          alt={"Hero Image"}
          width={800}
          height={600}
          className="w-full max-w-xl"
        />
      </div>
    </section>
  );
}
