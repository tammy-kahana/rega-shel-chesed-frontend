import { Link } from "react-router-dom"


function NotFoundPage() {

    return (
        <>
            <h2 className="mt-12 text-center">הדף לא נמצא!</h2>
            <Link to="/tasks" className="block text-center">חזרה לרשימת המשימות</Link>
        </>
    )
}

export default NotFoundPage