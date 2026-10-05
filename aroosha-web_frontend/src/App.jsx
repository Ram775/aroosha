// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { AdminProvider } from "./auth/AdminContext";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </Router>
  );
}

export default App;