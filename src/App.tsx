import {Routes, Route} from "react-router-dom";
import Home from "./app/routes/home";
import {FC} from "react";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
