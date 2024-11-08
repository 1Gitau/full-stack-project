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
// import AccountSettings from "./Components/updatePassword/updatePasssword";
import Footer from "./Components/Footer/Footer";
import userStoreDetails
 from "./Components/Store/userStoreDetails";


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
          {/* <Route path="/account-settings" element={<AccountSettings />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
