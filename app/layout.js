import "./globals.css";
import Script from "next/script";
export const metadata = {
  title: "ResumeCraft Pro",
  description: "Build beautiful, professional resumes with live preview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EBK1SC2J89"
        />

        <Script strategy="afterInteractive" id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EBK1SC2J89');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <div id="print-root" style={{ display: "none" }} />
      </body>
    </html>
  );
}