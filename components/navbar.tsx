import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
                <div className="text-2xl font-bold text-primary">
                    VENARIUM
                </div>
            </Link>
            <div className="space-x-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home   
                </Link>
                <Link href="/sign-up" className="text-gray-600 hover:text-gray-900">
                    Sign Up
                </Link>
            </div>
        </div>
    </nav>
  );
}