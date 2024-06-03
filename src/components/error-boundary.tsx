const ERRORS_LIST = {
  ERROR_GET_RANDOM_USERS: 'The API exists but cannot find any data',
  ERROR_API: 'The API does not exists',
} as { [k: string]: string };

export const ErrorBoundary = ({ error }: { error: string }) => {
  return (
    <div>
      <strong>{ERRORS_LIST[error]}</strong>
    </div>
  );
};
