import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/UserPages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import CreateJob from './pages/UserPages/AddListingPage';
import { PrivateRoute, PrivateAdminRoute } from "./routes/PrivateRoute";
import AdminDashboardPage from '@/pages/AdminPages/AdminDashboardPage';
import GetListingByUserPage from './pages/UserPages/GetListingByUser';
import UpdateListingByUserPage from './pages/UserPages/UpdateListing';
import { AlertProvider } from '@/context/AlertContext';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AlertProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/my-jobs" element={<GetListingByUserPage />} />
              <Route path="/edit-listing/:id" element={<UpdateListingByUserPage />} />
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<PrivateAdminRoute />}>
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </AlertProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
