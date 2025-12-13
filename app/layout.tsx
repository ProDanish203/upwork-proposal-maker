import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/store/react-query-provider";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Upwork Proposal Generator",
  description:
    "AI-powered tool to create tailored Upwork proposals quickly and effectively. Enhance your freelancing success with personalized proposals that stand out, saving you time and effort, and increasing your chances of winning projects. Trained on top-rated proposals for optimal results, learns from your feedback and data to improve over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "antialiased overflow-x-clip min-h-screen bg-neutral-50 dark:bg-background selection:bg-green-200 dark:selection:bg-green-500 dark:selection:text-black transition-colors",
          poppins.className,
          roboto.variable
        )}
      >
        <ReactQueryProvider>
          <main className="">
            <Toaster position="top-right" richColors />
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
