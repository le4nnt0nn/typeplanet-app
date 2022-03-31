import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// global style
import './App.css';

// components
import AllRoutes from './components/routing/AllRoutes';
import Initial from './components/setup/Initial';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// redux stuff (for works with redux)
import { Provider } from 'react-redux';
import store from "./utils/store";
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
