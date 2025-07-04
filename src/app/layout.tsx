import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AROUNDUS",
  description: "Aroundus is a social media platform that connects people through shared interests and activities.",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default Layout;