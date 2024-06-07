import { UsersList } from './_components/users-list';

export default function UsersPage() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="mb-6 text-xl font-bold">Users</h1>
      <UsersList />
    </section>
  );
}
