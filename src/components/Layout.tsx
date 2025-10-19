import { type PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/5 p-3">
        <div className="container mx-auto px-4 text-center text-gary-400">
          Copyright © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
