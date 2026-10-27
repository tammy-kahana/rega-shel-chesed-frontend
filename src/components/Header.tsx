import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

function Header() {

    const { user, logout } = useAuth();
    return (
        <header>
            <nav>
                <Link to="/tasks">רגע של חסד</Link>
                {user && (
                    <>
                        <NavLink to="/tasks">משימות</NavLink>
                        {user.role === 'COORDINATOR' && (
                            <>
                                <NavLink to="/tasks/new">משימה חדשה</NavLink>
                                <NavLink to="/volunteers">ניהול מתנדבים</NavLink>
                            </>
                        )}
                        <span>שלום, {user.fullName}, {user.roleLabel}</span>
                        <button onClick={logout}>התנתקות</button>
                    </>)}
            </nav>
        </header>
    )
}

export default Header