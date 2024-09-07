import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";
// import useAuthStore from "./store/authStore.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.js";

function App() {
  // We are checking if this user is authenticated and we're relying on Firebase, not the local storage.
  const [authUser] = useAuthState(auth);
  // This checks if the user is authenticated based on local storage.
  // const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to="/" />}
          />
          {/* Since the user profile will be dynamic, we put : and anything we want for the variable name */}
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
