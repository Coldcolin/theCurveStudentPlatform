import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () =>{
    // const { saveUser } = useAuth();
    const location = useLocation();
    const Id = useSelector((e)=> e.Id)
    
    return (
        Id?.Id?.id !== ""? <Outlet />: <Navigate to="/login" state={{ from : location }} replace />
    )
};

export default RequireAuth;