import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/components/pages/home/Home';
import Register from '../src/components/pages/register/Register';
import Login from '../src/components/pages/login/Login';
import UserProfile from './components/pages/dashboard/UserDashboard/userProfile/UserProfile';
import WantToReadDetails from './components/pages/dashboard/UserDashboard/wantToRead/WantToReadDetails';
import HaveReadDetails from './components/pages/dashboard/UserDashboard/haveRead/HaveReadDetails';
import UserHome from './components/pages/dashboard/UserDashboard/userHome/UserHome';
import PrivateRoutes from './layouts/PrivateRoutes';

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/-profile' element={<UserProfile />} />
          
          {/* Protected/Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path='/-home' element={<UserHome />} />
            <Route path='/-wanttoread' element={<WantToReadDetails />} />
            <Route path='/-haveread' element={<HaveReadDetails />} />
          </Route>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;