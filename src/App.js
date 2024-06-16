import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Posts from './Components/Post/Posts';
import BlogPreview from './Pages/BlogPreviewPage/BlogPreviewPage';
import Login from './Pages/Login/Login';
import NotificationPage from './Pages/NotificationPage/NotificationPage';
import PostBlogPage from './Pages/PostBlog/PostBlogPage';
import ProfileMenuPage from './Pages/ProfileMenu/ProfileMenuPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import Signup from './Pages/SignupPage/Signup'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { BlogProvider } from './utils/BlogContext';
import { LoginProvider } from './utils/loginContext';
import ProtectedRoute from './utils/ProtectedRoute';
import { BlockchainProvider } from './utils/BlockchainContext';
import BlogPage from './Pages/BlogPage/BlogPage';

function App() {
  return (
    <BlockchainProvider>
    <LoginProvider>
      <BlogProvider>
      <Router>
        <div>
          <Navbar />
          <div className="AppContainer">
            <Routes>
              {/* Define your routes */}
              <Route exact path="/" element={<Posts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/blogpage' element={<BlogPage/>}/>
              {/* <Route element={<ProtectedRoute />}> */}
                <Route path='/notifications' element={<ProtectedRoute>
                                                        <NotificationPage/>
                                                      </ProtectedRoute>}/>
                <Route path='/profileMenu' element={<ProtectedRoute>
                                                      <ProfileMenuPage/>
                                                    </ProtectedRoute>}/>
                <Route path='/profile' element={<ProtectedRoute>
                                                  <ProfilePage/>
                                                </ProtectedRoute>}/>
                <Route path='/settings' element={<ProtectedRoute>
                                                  <SettingsPage/>
                                                 </ProtectedRoute>}/>
                <Route path='/blogpreview' element={<ProtectedRoute>
                                                      <BlogPreview/>
                                                    </ProtectedRoute>}/>
                <Route path='/postblog' element={<ProtectedRoute>
                                                   <PostBlogPage/>
                                                 </ProtectedRoute>}/>
              {/* </Route> */}
              {/* Add a default route or a "not found" component */}
              {/* <Route component={NotFound} /> */}
              {/* Your existing content */}
            </Routes>
          </div>
        </div>
      </Router>
      </BlogProvider>
    </LoginProvider>
    </BlockchainProvider>
  );
}

export default App;
