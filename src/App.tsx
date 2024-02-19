import {lazy, Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PageNotFound from './components/pageNotFound';
import ProtectedRoutes from './utils/ProtectedRoutes';
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound theme="dark" />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
