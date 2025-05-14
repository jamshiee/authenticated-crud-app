import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";

export default function App() {
  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
