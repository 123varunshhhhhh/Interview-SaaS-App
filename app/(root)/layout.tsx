import Link from "next/link"; //Home page
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo1.png" alt="MockMate Logo" width={58} height={42} />
          <h2 className="text-primary-100">Interview Edge</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
