import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./context/UserContext";

import InitialPage from "./components/InitialPage";
import SignUp from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./components/Main";
import Ranking from "./components/Ranking";

function App() {
      const [nameUser, setNameUser] = useState("")
      const [user, setUser] = useState({
        token: ""
    })
      
    
    return (
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser, nameUser, setNameUser }}>
          <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/main" element={<Main />} />
              <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
  
  export default App;