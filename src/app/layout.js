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
                    title="Update text on homepage" 
                    description="Just one sentence right now. Clean it up and make it better"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Desktop layout is too wide" 
                    description="Add some margin to the desktop layout so it's not too wide"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Remove duplicate arrests" 
                    description="DeportationData site says there's duplicate arrets. See what's needed to remove them"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Mobile device orientation with media query" 
                    description="Message to suggest rotating device to landscape for better experience"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Make charts display: block on mobile devices" 
                    description="Make charts display: block on mobile devices"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Parse criminality statuses to be user friendly" 
                    description="Parse criminality statuses to be user friendly with function"
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Add dummy logo to header" 
                    description="Look at logoipsum for dummy logo"
                    urgency="MEDIUM"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Maybe add labels/percentages to pie charts" 
                    description="Add labels/percentages to pie charts"
                    urgency="MEDIUM"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Stylize paragraph in a nice way" 
                    description="Stylize paragraph in a nice way"
                    urgency="MEDIUM"
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
