
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import ContainerRouter from './components/layout/ContainerRouter';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar /> 
        <Routes>
          <Route  element={<ContainerRouter customClass="min-height"/>}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company" element={<Company />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/newproject" element={<NewProject />} />
          </Route>
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
