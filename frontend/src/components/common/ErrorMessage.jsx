function ErrorMessage({ error, onRetry }) {
  const message = typeof error === "string" ? error : error?.message;

  return (
    <div role="alert">
      <p>Something went wrong: {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

export default ErrorMessage;