import { Sofia_Sans } from "next/font/google";
import "./globals.css";

const sofiaSans = Sofia_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Todo App",
    description: "An app to control things to do",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sofiaSans.className}>{children}</body>
    </html>
  );
}
