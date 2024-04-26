import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="navbar bg-green-700 text-white">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className="flex gap-10">
          <div className="font-extrabold">KYC System</div>

          <div>
            {session?.user?.role == "admin2" ? (
              <>
                <Link href="/Admin/adtwo" className="mr-4">
                  Home
                </Link>
                <Link href="/Admin/adtwo/approved" className="mr-4">
                  Approved
                </Link>
                <Link href="/Admin/adtwo/rejected">Rejected</Link>
              </>
            ) : (
              <>
                <Link href="/" className="m-3">
                  Home
                </Link>
              </>
            )}
          </div>
        </div>
        <div>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
