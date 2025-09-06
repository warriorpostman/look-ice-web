import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Menu from "./components/Menu";
import ProjectTask from "./components/ProjectTask";
const isDevelopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "lookice - data and visualization",
  description: "Browse deportation data from ICE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <h1>lookice</h1> 
        <main>
          <Menu />
          {children}
        </main>

            {isDevelopment === true &&
            <>
                <h3>TASKS</h3>
                <ProjectTask 
                    title="Make total record count dynamic" 
                    description="Total record count is hard-coded right now. Compose the count with paged table data in a table result."
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Stylize paragraph in a nice way" 
                    description="Stylize paragraph in a nice way"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Charts - Make country chart top 20" 
                    description="Add the State filter to detainers" 
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Charts - Consider better labels" 
                    description="Title the charts appropriately" 
                    urgency="MEDIUM"
                    status="TODO" 
                />
            </>
            }
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </body>
    </html>
  );
}
