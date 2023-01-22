import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar"
import ExercisesList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" element={<ExercisesList/>}/>
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/user" element={<CreateUser/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;