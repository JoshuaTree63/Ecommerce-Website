import React, {useState, useEffect} from "react"
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import {createProduct, deleteProduct, listProducts} from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import Paginate from "../Components/Paginate"
import { useNavigate, Link } from "react-router-dom"


const ProductListScreen = () => {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
  
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    // Use the navigate function for navigation
    const navigate = useNavigate();
  
    useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
        dispatch(listProducts());
      } else {
        // Use the navigate function for navigation
        navigate('/login');
      }
    }, [dispatch, userInfo, successDelete]);
  
    const deleteHandler = (id) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch(deleteProduct(id));
      }
    };
  
    const createProductHandler = () => {
      dispatch(createProduct());
    };
  
    return (
      <div>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
  
          <Col className="text-end">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
  
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
  
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
  
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
  
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
   

export default ProductListScreen;