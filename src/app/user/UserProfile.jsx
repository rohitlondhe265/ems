
function UserProfile({ user }) {
  return (
    <div className="bg-skin-on-fill p-9 shadow-lg rounded-lg w-fit mx-auto">
      <img
        src={user?.image}
        alt={user?.name}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold text-center mt-4">{user?.name}</h2>
      <p className="text-center text-muted">{user?.email}</p>
    </div>
  );
}

export default UserProfile;
