import { Link } from "react-router";

function ErrorPage() {
  return (
    <section>
      <h1>Page not found</h1>

      <Link to="/">Go back home</Link>
    </section>
  );
}

export default ErrorPage;
