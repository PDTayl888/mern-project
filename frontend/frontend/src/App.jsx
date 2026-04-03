import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CategoryDetails from "./pages/CategoryDetails";

function App() {
  const { user, loading } = useContext(AuthContext);
  console.log("Current User Status:", { user, loading });

  if (loading) {
    return <div>LOADING...</div>;
  }



  return (
      <div>
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories/:categoryId"
              element={user ? <CategoryDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
