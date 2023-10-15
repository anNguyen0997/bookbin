import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/components/pages/home/Home';
import Register from '../src/components/pages/register/Register';
import Login from '../src/components/pages/login/Login';
import Dashboard from './components/pages/dashboard/DashboardAuth';
import UserBooks from './components/pages/dashboard/UserDashboard/UserBooks';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/userbooks' Component={UserBooks} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
