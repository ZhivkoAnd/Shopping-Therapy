import { UserAuth } from "../../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AuthenticationMenu = () => {
  const { user, logout }: any = UserAuth();

  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      {!user && <Link to="/login">Login</Link>}
      {user && (
        <>
          <h5>Hi {user.email}</h5>
          <Link to="/login" onClick={handleLogout}>
            Log Out
          </Link>
        </>
      )}
    </>
  );
};

export default AuthenticationMenu;
