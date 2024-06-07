'use client';

import { useUsersApiQuery } from '@jasobs10/api-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Spinner
} from '@jasobs10/ui-kit';

export const UsersList = () => {
  const { data: users, isLoading } = useUsersApiQuery();

  if (isLoading) {
    return (
      <div className="w-100 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(({ id, username, givenName, familyName }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{givenName}</TableCell>
            <TableCell>{familyName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
