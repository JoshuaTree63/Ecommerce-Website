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
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';


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
              <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
              <Route path='/order/:id' element={<OrderScreen/>}/>
              <Route path='/payment' element={<PaymentScreen/>}/>
              <Route path='/product/:id' element={<ProductScreen/>}/>
              <Route path='/cart/:id?' element={<CartScreen/>}/>

              <Route path='/admin/userlist' element={<UserListScreen/>}/> 
              <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>           
          
            </Routes>
          </Container>          
        </main>
        <Footer />
    </BrowserRouter>  

  );
}

export default App;
