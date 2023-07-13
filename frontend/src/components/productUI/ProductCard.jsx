import React from 'react'
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../../styles/product-card.css"
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlices';
import { toast } from 'react-toastify';

const ProductCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
        })
        );

        toast.success("Product added to cart")
    }

    return (
        <Col lg="3" md="4">
            <motion.div whileHover={{ scale: 0.95 }} className="product_item">
                <Link to={`/product/${item.id}`}>
                    <div className="product_img">
                        <img src={item.imgUrl} alt="" />
                    </div>
                    <div className='p-2 product_info'>
                        <h3 className='product_name'>{item.productName}</h3>
                        <span className='text-center'>{item.category}</span>
                    </div>
                </Link>
                <div className="product_card_bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">${item.price}</span>
                    <motion.span whileTap={{ scale: 1.1 }} className="add_cart" onClick={addToCart}>Add to Cart</motion.span>
                </div>
            </motion.div>
        </Col>
    )
}

export default ProductCard