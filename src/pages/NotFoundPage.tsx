import { Link } from "react-router-dom"


function NotFoundPage() {

    return (
        <>
            <h2>הדף לא נמצא!</h2>
            <Link to="/tasks">חזרה לרשימת המשימות</Link>
        </>
    )
}

export default NotFoundPage