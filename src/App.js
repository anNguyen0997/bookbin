import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from './config/firebase';

import Home from '../src/components/pages/home/Home';
import Register from '../src/components/pages/register/Register';
import Login from '../src/components/pages/login/Login';
import DashboardAuth from './components/pages/dashboard/DashboardAuth';
import UserProfile from './components/pages/dashboard/UserDashboard/userProfile/UserProfile';
import WantToReadDetails from './components/pages/dashboard/UserDashboard/wantToRead/WantToReadDetails';
import HaveReadDetails from './components/pages/dashboard/UserDashboard/haveRead/HaveReadDetails';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />

          {/* Need authentication */}
          <Route path='/-userhome' Component={DashboardAuth} />
          <Route path='/-profile' Component={UserProfile} />
          <Route path='/-wanttoread' Component={WantToReadDetails} />
          <Route path='/-haveread' Component={HaveReadDetails} />
          


        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
