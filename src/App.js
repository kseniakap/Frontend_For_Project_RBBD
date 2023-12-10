import { Layout } from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MainPage } from "./pages/MainPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";
import { AddPostPage } from "./pages/AddPostPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditPostPage } from "./pages/EditPostPage";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [addNewPost, setAddNewPost] = useState(false)

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout addNewPost={addNewPost}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {user?._id === "6574cbec126eb131eb6957b4" && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        <Route path="posts" element={<PostsPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostPage  setAddNewPost={setAddNewPost}/>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

      {/* <ToastContainer position="bottom-right" /> */}
    </Layout>
  );
}

export default App;
