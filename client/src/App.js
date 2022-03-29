import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
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
        <>
          <Register/>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
