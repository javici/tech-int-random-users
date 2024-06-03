import { MappedUsers, RandomUsers } from '../interfaces/random-user.interface';

export async function getRandomUsers() {
  return fetch('https://randomuser.me/api?results=100')
    .then((response) => {
      if (!response.ok) {
        // NOTE: Only in the case if the API exists and returns something i.e 404
        throw new Error('ERROR_GET_RANDOM_USERS');
      }

      return response.json();
    })
    .then(({ results }: RandomUsers) => {
      return results.map(({ picture, location, name, login }) => ({
        firstName: name.first,
        lastName: name.last,
        picture: picture.thumbnail,
        userId: login.uuid,
        country: location.country,
      })) as MappedUsers[];
    })
    .catch(() => {
      throw new Error('ERROR_API');
    });
}
