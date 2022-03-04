import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {BsStar, BsStarFill} from "react-icons/bs";
import useFetch from "../customHook/useFetch";

const Product = ({cartProduct, setCartProduct, setCartShow}) => {

   const handleAddToCart = (cartItem) => {
      setCartShow(true)
      cartItem.qty =1;
      setCartProduct([...cartProduct, cartItem])
   }

   const {data, isLoading, error} = useFetch(
       "https://fakestoreapi.com/products"
   )

   const loadingMsg = <p className='text-center'>Loading...</p>;
   const errorMsg   = <p className='text-center'>{error}</p>

   return (
       <div className='bg-light mt-3 py-5'>
          <Container>
             <Row>
                {isLoading && loadingMsg}
                {error && errorMsg}
                {
                   data?.map(item => (
                       <Col md={3} className='mb-4' key={item.id}>

                          <Card className={`h-100`}>
                             <div className='card-image'>
                                <Card.Img variant="top" src={item.image}/>
                             </div>
                             <Card.Body>
                                <div className="d-flex flex-column h-100">

                                   <div className='card-rating mb-2 d-flex align-items-center gap-2'>
                                      {
                                         [...Array(5)].map((each, index) => (
                                             index < Math.floor(item.rating.rate) ?
                                             <BsStarFill color='#ffc107' key={index}/> :
                                             <BsStar color='#000' key={index}/>
                                         ))
                                      }
                                      ( {Math.floor(item.rating.rate)} )
                                   </div>

                                   <div className='mb-3'>
                                      <Card.Title className='text-primary'>{item.title}</Card.Title>
                                      <Card.Text>
                                         {item.description.length > 200
                                             ? `${item.description.slice(0, 200)} ... ` : item.description}
                                      </Card.Text>
                                   </div>
                                   <div className="d-flex justify-content-between h-100">
                                      <Button className='align-self-end'
                                              variant="warning">${item.price}</Button>
                                      <Button
                                          className='align-self-end'
                                          variant="primary"
                                          disabled={cartProduct.find(cp => cp.id === item.id)}
                                          onClick={() => handleAddToCart(item)}>{cartProduct.find(cp => cp.id === item.id) ? 'Added To Cart' : 'Add To Cart'}
                                      </Button>
                                   </div>
                                </div>
                             </Card.Body>
                          </Card>
                       </Col>

                   ))
                }
             </Row>
          </Container>
       </div>
   );
};

export default Product;