import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Register } from "./components/User/Register/Register";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <div className={styles["app"]}>
          <Header />
          <main className={styles["main"]}>
            <Routes>
              <Route path="/user/register" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <footer className={styles["footer"]}>
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
