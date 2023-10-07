import User from "./User";

export const metadata = {
  title: "User Profile",
  description: "This is the User profile Page",
  robots: {
    index: false,
  },
};

export default function page() {
  return (
    <main>
      <User />
    </main>
  );
}
