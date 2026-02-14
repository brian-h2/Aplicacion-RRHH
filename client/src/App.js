import { useEffect, useState,  } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoadingComponent from "./components/Loading";
// import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Auth/HomePage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/LogIn";
import ProtectedPage from "./pages/Protected/ProtectedPage";
import JobList from "./pages/Protected/Jobs/JobList";
import JobPostForm from "./pages/Protected/CRUD/JobPostForm";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import * as PATHS from "./utils/paths";
import JobDetail from "./pages/Protected/Jobs/JobDetail";
import JobEditForm from "./pages/Protected/CRUD/JobEditForm";
import ClientDashboard from "./pages/Client/ClientDashboard";
import { SearchProvider } from "./components/SearchBar/SearchContext";
import JobPreview from "./pages/Protected/Jobs/JobPreview";
import { JobProvider } from "./pages/Protected/Jobs/JobsContext";
import AboutPage from "./pages/Client/AboutPage";
import MobileClientDashboard from "./pages/Client/MobileClientDashboard";
import ServiceClients from "./pages/Client/ServicesClients";
import HomeClient from "./pages/Client/HomeClient";

// Layout donde se usa el NavbarClient
import ClientPublicLayout from "./components/ClientePublicLayout";


export default function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  // handling logout 
  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
       // If there is no token, update user state and navigate to login
    setUser(null);
    setIsLoading(false);
    console.log("No access token found, logging out immediately.");
    navigate(PATHS.LOGINPAGE);
    return;
      
    }
    setIsLoading(true);
 
    logout(accessToken)
    .then((res) => {
      if (!res.status) {
        // Handle unsuccessful logout (e.g., server issues)
        console.error("Logout was unsuccessful: ", res);
      } else {
        USER_HELPERS.removeUserToken(); // Remove token from local storage
        setUser(null);                  // Set user state to null
        navigate(PATHS.LOGINPAGE);      // Navigate to the login page
      }
    })
    .catch((err) => {
      console.error("Error during logout: ", err);
    })
    .finally(() => {
      // Always set loading to false once the logout request is complete
      setIsLoading(false);
    });
  }
  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Routes>

        {/* AUTH PAGES (Home, Login, Signup) */}
        <Route
          path={PATHS.HOMEPAGE}
          element={
            <HomePage
              user={user}
              authenticate={authenticate}
              handleLogout={handleLogout}
            />
          }
        >
          <Route index element={<Navigate to={PATHS.CLIENTDASHBOARD} />} />
          <Route path={PATHS.SIGNUPPAGE} element={<Signup authenticate={authenticate} />} />
          <Route path={PATHS.LOGINPAGE} element={<Login authenticate={authenticate} />} />
        </Route>

        {/* PROTECTED DASHBOARD */}
        <Route
          path="dashboard/*"
          element={
            <SearchProvider>
              <JobProvider>
                <ProtectedPage user={user} handleLogout={handleLogout} />
              </JobProvider>
            </SearchProvider>
          }
        >
          <Route path="jobs" element={<JobList />} />
          <Route path="job/:jobId" element={<JobDetail />} />
          <Route path="edit-job/:jobId" element={<JobEditForm />} />
          <Route path="post-job" element={<JobPostForm />} />
          <Route path="job-preview" element={<JobPreview />} />
        </Route>

        {/* PUBLIC CLIENT ROUTES (WITH NAVBAR) */}

        <Route element={<ClientPublicLayout />}>

          {/* Servicios a Clientes */}
          <Route path="/clientservice" element={<ServiceClients />} />

          {/* Client Dashboard Público */}
          <Route
            path="/clientdashboard/*"
            element={
              <SearchProvider>
                <JobProvider>
                  <HomeClient />
                </JobProvider>
              </SearchProvider>
            }
          >
            <Route index element={<Navigate to="about" />} />

            <Route
              path="clientjobs/:id?"
              element={
                isMobile ? <MobileClientDashboard /> : <ClientDashboard />
              }
            />

            <Route path="about" element={<AboutPage />} />
          </Route>

        </Route>

        {/* DYNAMIC ROUTES */}
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      </Routes>
    </div>

  );
}

