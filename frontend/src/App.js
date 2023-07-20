import {Container} from'react-bootstrap'
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from './Screens/HomeScreen';
import {BrowserRouter ,Route, Routes}from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';


function App() {
  return (
    
    <BrowserRouter>
      <Header />    
        <main className="py-3">
          <Container>
            <Routes>
              {" "}            
              <Route path='/' element={<HomeScreen/>}/>
              <Route path='/product/:id' element={<ProductScreen/>}/>
            </Routes>
          </Container>          
        </main>
        <Footer />
    </BrowserRouter>  

  );
}

export default App;
