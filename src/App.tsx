import { lazy, createEffect, createSignal, Show } from "solid-js";
import { Router, Route, Navigate } from "@solidjs/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { StudyRoomProvider } from "./contexts/StudyRoomContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/app/ProtectedRoute/ProtectedRoute";

// Webサイトの共通レイアウト
import Header from "./components/site/Header/Header";
import Footer from "./components/site/Footer/Footer";
// アプリの共通レイアウト
import Sidebar from "./components/app/Sidebar/Sidebar";
import ThemeSwitcher from "./components/app/ThemeSwitcher/ThemeSwitcher";

// Webサイトのページ
const Home = lazy(() => import("./pages/site/Home/Home"));
const Features = lazy(() => import("./pages/site/Features/Features"));
const Pricing = lazy(() => import("./pages/site/Pricing/Pricing"));
const Testimonials = lazy(
  () => import("./pages/site/Testimonials/Testimonials")
);
const Download = lazy(() => import("./pages/site/Download/Download"));
const FAQ = lazy(() => import("./pages/site/FAQ/FAQ"));
const Blog = lazy(() => import("./pages/site/Blog/Blog"));
const Support = lazy(() => import("./pages/site/Support/Support"));
const About = lazy(() => import("./pages/site/About/About"));
const Legal = lazy(() => import("./pages/site/Legal/Legal"));
const Login = lazy(() => import("./pages/app/Login/Login"));
const ResetPassword = lazy(
  () => import("./pages/app/ResetPassword/ResetPassword")
);
// アプリのページ
const Dashboard = lazy(() => import("./pages/app/Dashboard/Dashboard"));
const StudyRoom = lazy(() => import("./pages/app/StudyRoom/StudyRoom"));
const StudyRoomSelection = lazy(
  () => import("./pages/app/StudyRoomSelection/StudyRoomSelection")
);
const Profile = lazy(() => import("./pages/app/Profile/Profile"));
const EditProfile = lazy(() => import("./pages/app/EditProfile/EditProfile"));
const InitialSetup = lazy(
  () => import("./pages/app/InitialSetup/InitialSetup")
);

import { LayoutContainer, MainContent, GlobalStyle } from "./App.styled";

// Webサイトの共通レイアウト
const SiteLayout = (props: { children?: any }) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

// アプリの共通レイアウト
const AppLayout = (props: { children?: any }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>{props.children}</MainContent>
    </LayoutContainer>
  );
};

// ルーティング（サイト・アプリ共通）
function App() {
  const [isLoggedIn, setIsLoggedIn] = createSignal<boolean | null>(null);

  createEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  });

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Show when={isLoggedIn() !== null}>
        <Router>
          <Route path="/" component={SiteLayout}>
            <Route path="/" component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/download" component={Download} />
            <Route path="/faq" component={FAQ} />
            <Route path="/blog" component={Blog} />
            <Route path="/support" component={Support} />
            <Route path="/about" component={About} />
            <Route path="/legal" component={Legal} />
            <Route
              path="/login"
              component={() =>
                isLoggedIn() ? <Navigate href="/webapp/dashboard" /> : <Login />
              }
            />
            <Route path="/reset-password" component={ResetPassword} />
          </Route>
          <Route path="/">
            <Route
              path="/webapp/initial-setup"
              component={() => <ProtectedRoute component={InitialSetup} />}
            />
          </Route>
          <StudyRoomProvider>
            <Route path="/webapp" component={AppLayout}>
              <Route
                path="/dashboard"
                component={() => <ProtectedRoute component={Dashboard} />}
              />
              <Route
                path="/study-room"
                component={() => <ProtectedRoute component={StudyRoom} />}
              />
              <Route
                path="/study-room-selection"
                component={() => (
                  <ProtectedRoute component={StudyRoomSelection} />
                )}
              />
              <Route
                path="/study-room/:roomId"
                component={() => <ProtectedRoute component={StudyRoom} />}
              />
              <Route path="/profile">
                <Route
                  path="/"
                  component={() => <ProtectedRoute component={Profile} />}
                />
                <Route
                  path="/edit"
                  component={() => <ProtectedRoute component={EditProfile} />}
                />
              </Route>
            </Route>
          </StudyRoomProvider>
        </Router>
      </Show>
    </ThemeProvider>
  );
}

export default App;
