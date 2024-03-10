import './App.css';
import HomePage from './pages/HomePage';
// import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import { AuthProvider } from './services/authService';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              < HomePage />
            </ProtectedRoute>
          }
        />
        <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* example of route with sub routes useful for spesfic module page or page belong to parent page*/}
        {/* <Route
                path="blog"
                element={
                  <ProtectedRoute>
                    <BlogLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BlogPostsPage />} />
                <Route path=":id" element={<PostDetailPage />} />
              </Route> */}

      </Routes>

    </AuthProvider>
  );
}

export default App;