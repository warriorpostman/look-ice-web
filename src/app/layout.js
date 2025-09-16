import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        <div className="site-header">
          <div>
            <img src="/logoipsum-401.svg" alt="logo" />
          </div>
          <div>
            <h1>lookice</h1> 
          </div>
        </div>
        <main>
          <Menu />
          {children}
        </main>

            {isDevelopment === true &&
            <>
                <h3>TASKS</h3>
                <ProjectTask 
                    title="Add removals data" 
                    description="Removals data is questionable, but we should add it, and add an asterisk with note" 
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Remove duplicate arrests" 
                    description="DeportationData site says there's duplicate arrets. See what's needed to remove them"
                    urgency="LOW"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Maybe add labels/percentages directly to pie charts" 
                    description="Add labels/percentages to pie charts"
                    urgency="LOW"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Charts - Consider better labels" 
                    description="Title the charts appropriately and label axes as needed" 
                    urgency="LOW"
                    status="TODO" 
                />
            </>
            }
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </body>
    </html>
  );
}
