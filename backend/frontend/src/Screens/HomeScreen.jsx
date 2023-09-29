import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from "../Components/Product.jsx";
import Loader from "../Components/Loader.jsx";
import Message from "../Components/Message.jsx";
import { listProducts } from "../actions/productActions.jsx";
import Paginate from '../Components/Paginate.jsx';
import ProductCarousel from '../Components/ProductCarousel'


const  HomeScreen = ()=> {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;
  
    // Use useEffect to fetch products when the component mounts
    useEffect(() => {
      dispatch(listProducts());
    }, [dispatch]);
  
    // Calculate the number of advertisements based on available screen height
    const screenHeight = window.innerHeight;
    const adHeight = 300; // Height of each advertisement
    const numAds = Math.floor((screenHeight - 70) / (adHeight + 30)); // Consider bottom ad and spacing
  
    // Helper function to generate multiple line breaks
    const generateLineBreaks = (count) => {
      const lineBreaks = [];
      for (let i = 0; i < count; i++) {
        lineBreaks.push(<br key={i} />);
      }
      return lineBreaks;
    };
  
    return (
      <div>
        <h1>Upcoming hits</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            
            <Col md={10}>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
  
          </Row>
        )}
  
      </div>
    );
  }
  
  export default HomeScreen;
