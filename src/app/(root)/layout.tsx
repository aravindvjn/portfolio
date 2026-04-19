import LenisProvider from "@/components/wrappers/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LenisProvider>{children}</LenisProvider>;
}
