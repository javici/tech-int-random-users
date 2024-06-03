import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MappedUsers } from '../interfaces/random-user.interface';
import { getRandomUsers } from '../services/get-random-users.service';

export function useRandomUsers() {
  const [users, setUsers] = useState<MappedUsers[]>();
  const [filterParam, setFilterParam] = useState<keyof MappedUsers>();
  const [countrySearch, setCountrySearch] = useState<string | null>(null);
  const initialState = useRef<MappedUsers[]>();
  const [error, setError] = useState<string>();

  const sortyByParam = (param: keyof MappedUsers) => {
    setFilterParam(param);
  };

  const sortedData = useMemo(() => {
    if (!users) {
      return null;
    }
    let sortableData = [...(users as MappedUsers[])];

    if (filterParam) {
      sortableData.sort((a, b) => {
        return a[filterParam].localeCompare(b[filterParam]);
      });
      [];
    }

    if (countrySearch) {
      sortableData = sortableData.filter((user) =>
        user.country
          .toLocaleLowerCase()
          .startsWith(countrySearch.toLocaleLowerCase())
      );
    }

    if (countrySearch || filterParam) {
      return sortableData;
    }

    return users;
  }, [filterParam, users, countrySearch]);

  const getUsers = async () => {
    try {
      const mappedUsers = await getRandomUsers();
      setUsers(mappedUsers as MappedUsers[]);
      if (!initialState.current) {
        initialState.current = mappedUsers;
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
  };

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  }, [users]);

  const handleOnDeleteUser = (userId: string) => {
    const updatedUsers = users?.filter((user) => user.userId !== userId);

    setUsers(updatedUsers);
  };

  const handleOnResetUsers = () => {
    setUsers(initialState.current);
  };

  const filterByCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountrySearch(e.target.value);
  };

  return {
    error,
    handleOnDeleteUser,
    handleOnResetUsers,
    users: sortedData,
    sortyByParam,
    filterByCountry,
  };
}
