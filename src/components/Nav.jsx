import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Nav(props) {
  const { user } = props;

  useEffect(() => {
    console.log("User changed:", user);
  }, [user]);

  return (
    <nav>
      <div className="page-header">
        <div className="home">
          <NavLink to="/dionhp">Home </NavLink>
        </div>
          {user ? (
            <>
              <div className="welcomes">Welcome {user.name || ""}</div>
              <div className="signOut">
                <NavLink to="/sign-out">Sign Out</NavLink>
              </div>
            </>
          ) : (
            <div className="signInOut">
              <NavLink className="sign-up-nav" to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink className="sign-in-nav" to="/sign-in">
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      {/* </div> */}
    </nav>
  );
}