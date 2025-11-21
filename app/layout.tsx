import "@/styles/globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "E-Bestro",
  icons: {
    icon: "/1st.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
