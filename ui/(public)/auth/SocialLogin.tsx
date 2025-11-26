"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconBrandMeta,
} from "@tabler/icons-react";

export default function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleLogin(provider: string) {
    try {
      setLoadingProvider(provider);
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-secondary [&>button]:hover:text-secondary">
      <Button
        type="button"
        onClick={() => handleLogin("google")}
        disabled={!!loadingProvider}
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        {loadingProvider === "google" ? (
          <Spinner className="size-5" />
        ) : (
          <IconBrandGoogle className="size-5" />
        )}
        <span className="sr-only">Login with Google</span>
      </Button>

      <Button
        type="button"
        onClick={() => handleLogin("apple")}
        disabled={!!loadingProvider}
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        {loadingProvider === "apple" ? (
          <Spinner className="size-5" />
        ) : (
          <IconBrandApple className="size-5" />
        )}
        <span className="sr-only">Login with Apple</span>
      </Button>

      <Button
        type="button"
        onClick={() => handleLogin("facebook")}
        disabled={!!loadingProvider}
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        {loadingProvider === "facebook" ? (
          <Spinner className="size-5" />
        ) : (
          <IconBrandMeta className="size-5" />
        )}
        <span className="sr-only">Login with Meta</span>
      </Button>
    </div>
  );
}
