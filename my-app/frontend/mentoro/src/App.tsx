import { LandingPage } from "./pages/LandingPage";
import { Prototype } from "./pages/Prototype"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return(
    <div className="bg-neutral-600">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><LandingPage /> <Prototype /></div>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;