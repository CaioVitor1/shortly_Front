import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./context/UserContext";

import InitialPage from "./components/InitialPage";
import SignUp from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./components/Main";
function App() {
      const [user, setUser] = useState({
        token: ""
    })
      
    
    return (
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/main" element={<Main />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
  
  export default App;