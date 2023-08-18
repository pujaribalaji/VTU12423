import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

const App = () => {
  return (
    <div>
      {/* <TrainsList/> */}
     <Register/>
    </div>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<TrainsList />} />
    //     {/* Create a TrainDetails component and route */}
    //     {/* <Route path="/train/:trainNumber" element={<TrainDetails />} /> */}
    //   </Routes>
    // </Router>
  );
};

export default App;
