import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./Components/Header/Header";
import Head from "./Components/head/head";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Writing from "./pages/Writing/Writing"; 
import FullBlog from "./Components/FullBlog/FullBlog";
import BlogFeed from "./Components/BlogsFeed/BlogFeed";
import BlogListing from "./Components/BlogListing/BlogListing";
import UpdateBlogPage from "./pages/UpdateBlogPage/UpdateBlogPage";
 import PasswordUpdatePage from "./pages/PasswordUpdatePage/PasswordUpdatePage";
//  import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import Footer from "./Components/Footer/Footer";
import userStoreDetails from "./Store/userStoreDetails";


const client = new QueryClient();
function App() {
  const user = userStoreDetails((state) => state.user);

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        {
          user ? <Head /> : <Header />
        }
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/blog-listing" element={<BlogListing />} />
          <Route path="/blog-feed" element={<BlogFeed />} />
          <Route path="/update-blog/:id" element={<UpdateBlogPage />} />
          <Route path="/update-password" element={<PasswordUpdatePage />} />
          {/* <Route path="/new-password" element={<NewPasswordPage />} /> */}
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
