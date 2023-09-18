import {Container} from'react-bootstrap'
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from './Screens/HomeScreen';
import {BrowserRouter ,Route, Routes}from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';


function App() {
  return (
    
    <BrowserRouter>
      <Header />    
        <main className="py-3">
          <Container>
            <Routes>
              {" "}            
              <Route path='/' element={<HomeScreen/>} exact/>
              <Route path='/login' element={<LoginScreen/>}/>
              <Route path='/register' element={<RegisterScreen/>}/>
              <Route path='/profile' element={<ProfileScreen/>}/>
              <Route path='/shipping' element={<ShippingScreen/>}/>
              <Route path='/payment' element={<PaymentScreen/>}/>
              <Route path='/product/:id' element={<ProductScreen/>}/>
              <Route path='/cart/' element={<CartScreen/>}/>            
            </Routes>
          </Container>          
        </main>
        <Footer />
    </BrowserRouter>  

  );
}

export default App;
