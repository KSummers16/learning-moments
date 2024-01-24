import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    return <ul className="navbar">
        <li className="navbar-item">
            <Link to='/posts'>Posts</Link>
        </li>
        <li className="navbar-item">
            <Link to='/userPosts'>My Posts</Link>
        </li>
        <li className="navbar-item">
            <Link to="/Profile">Profile</Link>
        </li>
        <li>
            <Link to='posts/NewPost'>Add Post</Link>
        </li>
        
        {localStorage.getItem("learning_user") ? (
        <li className="navbar-item">
            <Link
                to=""
                onClick={() => {
                localStorage.removeItem("learning_user")
                navigate("/login", { replace: true })
                }}
            >
                Logout
            </Link>
  </li>
) : (
  ""
)}
        
    </ul>
}