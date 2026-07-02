import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import ReportItem from "./pages/ReportItem";
import Profile from "./pages/Profile";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import MyPosts from "./pages/MyPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/complete-profile"
          element={<CompleteProfile />}
        />

        {/* Dashboard */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        {/* Report Item */}
       <Route
  path="/report-item"
  element={
    <ProtectedRoute>
      <ReportItem />
    </ProtectedRoute>
  }
/>

        {/* Profile */}
       <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        {/* Lost & Found */}
       <Route
  path="/lost"
  element={
    <ProtectedRoute>
      <Lost />
    </ProtectedRoute>
  }
/>

       <Route
  path="/found"
  element={
    <ProtectedRoute>
      <Found />
    </ProtectedRoute>
  }
/>

        {/* My Posts */}
        <Route
  path="/myposts"
  element={
    <ProtectedRoute>
      <MyPosts />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;