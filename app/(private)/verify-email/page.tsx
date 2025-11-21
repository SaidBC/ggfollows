import VerifyEmailCard from "@/ui/(private)/verify-email/VerifyEmailCard";
import apiAxios from "@/lib/apiAxios";
import { SendEmailCodeResponse } from "@/types";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const response = await apiAxios.post<SendEmailCodeResponse>(
    "/send-email-code",
    { reason: "EMAIL_VERIFICATION" },
    {
      headers: {
        cookie: cookieStore.toString(),
      },
    }
  );
  if (!response.data.success)
    return <>{response.data.errors.root || "An Exepected error occured"}</>;
  return (
    <main className="px-8 py-6 grid gap-4">
      <div>
        <h1 className="font-bold text-2xl">Verify Email</h1>
      </div>
      <VerifyEmailCard />
    </main>
  );
}
