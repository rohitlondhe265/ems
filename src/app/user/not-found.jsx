import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not User Login first to access User Page</p>
      <Link href="/login">Return to Login</Link>
    </div>
  );
}
