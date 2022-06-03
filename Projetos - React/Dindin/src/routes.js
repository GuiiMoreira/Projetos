import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo='/login' />}>
                <Route path='/home' element={<Home />} />
                <Route path='/' element={<Home />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;