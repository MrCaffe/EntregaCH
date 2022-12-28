import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/Pages/ItemListContainer/ItemListContainer";



const App = () => {
  return(
          <BrowserRouter>
            <NavBar/>
            <ItemListContainer />
          </BrowserRouter>
  );
};

export default App;
