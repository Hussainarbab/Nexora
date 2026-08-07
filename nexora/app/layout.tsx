import "./globals.css";

export const metadata = {
  title: "Nexora",
  description: "Your Gateway to Global Opportunities",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}