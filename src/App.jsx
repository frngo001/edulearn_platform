import React from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./lib/ThemeContext";
import { AuthProvider } from "./lib/AuthContext";

function App() {
  return (
    <div className="">
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
