export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-24 px-6 mx-auto max-w-lg ">{children}</div>;
}
