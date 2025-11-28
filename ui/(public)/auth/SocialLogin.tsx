"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiteralUnion, signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconBrandMeta,
} from "@tabler/icons-react";
import { BuiltInProviderType } from "next-auth/providers/index";
import ErrorText from "@/components/ErrorText";

export default function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(provider: LiteralUnion<BuiltInProviderType>) {
    if (provider !== "google")
      return setError(
        "This login method not supported for now, Try with google"
      );
    try {
      setLoadingProvider(provider);
      const res = await signIn(provider, {
        callbackUrl: "/dashboard",
      });
      if (res && res.error) return setError(res.error);
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
      {error && <ErrorText className="col-start-1 col-end-4" message={error} />}
    </div>
  );
}
