import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import PostInvoicePage from "./views/PostInvoicePage";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostInvoicePage />} />
      </Routes>
    </div>
  );
}

export default App;
