import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <>
      <Link to="/">
        <CiLogout color="#7429ba" fontSize="2em" />
      </Link>
    </>
  );
}

export default Logout;
