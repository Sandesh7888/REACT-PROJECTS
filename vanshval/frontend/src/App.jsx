import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewMember from "./pages/NewMember";
import TreeView from "./pages/TreeView";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/new-member"
            element={
              <ProtectedRoute>
                <NewMember />
              </ProtectedRoute>
            }
          />
          <Route path="/tree" element={<TreeView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
