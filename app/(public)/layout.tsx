import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/ui/(private)/AuthSessionProvider";
import Footer from "@/ui/(public)/Footer";
import Header from "@/ui/(public)/Header";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <AuthSessionProvider session={session}>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthSessionProvider>
  );
}
