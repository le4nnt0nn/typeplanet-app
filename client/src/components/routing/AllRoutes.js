import React from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { Route, Routes, BrowserRouter} from 'react-router-dom';

export const AllRoutes = () => {
    return (
        <>
            <section className='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' component={Register} exact ></Route>
                    <Route path='/login' component={Login} exact ></Route>
                </Routes>
            </BrowserRouter>
            </section>
        </>
    )
};
