import Navbar from "@/components/navbar";
import Provider from "@/components/provider";
import "@/styles/globals.css";

export const metadata = {
  title: "PromptShare",
  description: "Discover & Share AI Prompts",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
