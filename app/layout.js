import "./globals.css";

export const metadata = {
  title: "ResumeCraft Pro",
  description: "Build beautiful, professional resumes with live preview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div id="print-root" style={{ display: "none" }} />
      </body>
    </html>
  );
}