import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// global style
import './App.css';

// components
import Initial from './components/setup/Initial';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import Posts from './components/post/Posts';

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
          <Route path='/home' element={<Home />} />
          <Route path='/devs' element={<Profiles />} />
          <Route path='/devs/dev/:id' element={<Profile />} />
          <Route path='/me/:id' element={<Profile />} />
          <Route path='/create-profile' element={<CreateProfile />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
