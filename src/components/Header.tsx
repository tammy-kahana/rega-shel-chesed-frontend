import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

function Header() {

    const { user, logout } = useAuth();
    return (
        <header className="sticky top-0 z-10 border-b-4 border-accent-600 bg-brand-700 text-white">
            <nav className="relative mx-auto flex min-h-20 max-w-5xl flex-wrap items-center gap-2 px-4 py-5">
                <Link to="/" className="text-2xl font-bold text-white hover:no-underline lg:absolute lg:left-1/2 lg:-translate-x-1/2">רגע של חסד</Link>
                {user && (
                    <>
                        <NavLink to="/tasks" end className="border-b-2 border-transparent px-3 py-1.5 text-lg text-white hover:border-white/50 hover:no-underline">משימות</NavLink>
                        {user.role === 'COORDINATOR' && (
                            <>
                                <NavLink to="/tasks/new" className="border-b-2 border-transparent px-3 py-1.5 text-lg text-white hover:border-white/50 hover:no-underline">משימה חדשה</NavLink>
                                <NavLink to="/volunteers" className="border-b-2 border-transparent px-3 py-1.5 text-lg text-white hover:border-white/50 hover:no-underline">ניהול מתנדבים</NavLink>
                            </>
                        )}
                        <span className="ms-auto text-sm text-brand-50">שלום, {user.fullName}, {user.roleLabel}</span>
                        <button onClick={logout} className="border border-white/40 bg-transparent px-3 py-1.5 text-sm hover:bg-white/10">התנתקות</button>
                    </>)}
            </nav>
        </header>
    )
}

export default Header