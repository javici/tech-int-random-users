import { useState } from 'react';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { useRandomUsers } from './hooks/use-random-users.hook';

function App() {
  const {
    users,
    handleOnDeleteUser,
    handleOnResetUsers,
    error,
    sortyByParam,
    filterByCountry,
  } = useRandomUsers();
  const [hasColors, setHasColors] = useState(false);
  const colorLines = () => {
    setHasColors(!hasColors);
  };

  return (
    <div>
      {error && <ErrorBoundary error={error} />}
      {users ? (
        <div>
          <header style={{ marginBottom: '34px' }}>
            <h2>Users List</h2>
            <div>
              <button type='button' onClick={colorLines}>
                Color lines
              </button>
              <button type='button' onClick={() => sortyByParam('country')}>
                Sorty by country
              </button>
              <button type='button' onClick={handleOnResetUsers}>
                Reset to initial state
              </button>
              <input
                type='text'
                placeholder='Italy'
                onChange={filterByCountry}
              ></input>
            </div>
          </header>
          <main style={{ width: '100%' }}>
            <table className={`users-list ${hasColors ? '-has-colors' : ''}`}>
              <tbody>
                <tr>
                  <th>Picture</th>
                  <th onClick={() => sortyByParam('firstName')}>Name</th>
                  <th onClick={() => sortyByParam('lastName')}>LastName</th>
                  <th onClick={() => sortyByParam('country')}>Country</th>
                  <th>Action</th>
                </tr>
                {users.map(
                  ({ picture, firstName, lastName, country, userId }) => (
                    <tr key={userId}>
                      <td>
                        <img
                          src={picture}
                          alt={`Thumbnail image of the user: ${firstName}`}
                        />
                      </td>
                      <td>
                        <p>{firstName}</p>
                      </td>
                      <td>
                        <p>{lastName}</p>
                      </td>
                      <td>
                        <p>{country}</p>
                      </td>
                      <td>
                        <button
                          type='button'
                          onClick={() => handleOnDeleteUser(userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </main>
        </div>
      ) : null}
    </div>
  );
}

export default App;
