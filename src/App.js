import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./context/UserContext";

import InitialPage from "./components/InitialPage";


function App() {
      const [user, setUser] = useState({
        name: "",
        token: "",
        email: ""
          
      })
    
    return (
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
              <Route path="/" element={<InitialPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
  
  export default App;