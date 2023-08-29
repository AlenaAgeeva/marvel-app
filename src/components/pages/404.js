import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <h2>Page doesn't exist</h2>
      <h2>Back to main page</h2>
    </div>
  );
};
export default Page404;
