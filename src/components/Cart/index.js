import { Fragment, useState } from "react"
import Modal from "../UI/modal"
import CartItem from "./CartItem"
import OrderSuccessModal from "../UI/OrderSuccess"
import { useDispatch, useSelector } from "react-redux"
import { addItemHandler, clearCartHandler, placeOrderHandler, removeItemHandler } from "../../actions"

const Cart = () => {
    const [showModal, setShowModal] = useState(false)
    const [orderModal, setOrderModal] = useState(false)
    const items = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const [orderId, setOrderId] = useState("")
    const dispatch = useDispatch()

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    const handleOrderModal = () => {
        setShowModal(false);
        //dispatch(clearCartHandler())
        setOrderModal(previous => !previous)
    }

    const orderHandler = () => {
        // dispatch(clearCartHandler())
        dispatch(placeOrderHandler(response => {
            if(response.error) {
                alert(response.data.error || "Some error occurred, please try again")
            }
            else {
                console.log(response.data)
                setOrderId(response.data.name)
                setShowModal(false)
                setOrderModal(previous => !previous)
            }
        }))
    }

    const dispatchEvents = (type, item) => {
        if(type === 1) {
            dispatch(addItemHandler(item))
        }
        else if(type === -1) {
            dispatch(removeItemHandler(item.id))
        }
    }

    return (
        <Fragment>
            <button onClick={handleModal}>
                <div className="cart-icon-wrapper">
                    <span data-items={items.length}>Cart</span>
                </div>
            </button>
            {
                showModal &&
                <Modal onClose={handleModal}>
                    <div className="checkout-modal">
                        <h2>Checkout Modal</h2>
                        <div className="checkout-modal_list">
                            {
                                items.length > 0 ?
                                items.map(item => {
                                    return (
                                        <CartItem 
                                            data={item} 
                                            onEmitIncreaseItem={item => dispatchEvents(1, item)} 
                                            onEmitDecreaseItem={item => dispatchEvents(-1, item)}
                                            key={item.id}
                                        />
                                    )
                                })
                                : <div className="empty-cart">Please add something in your cart!</div>
                            }
                        </div>
                        { 
                            items.length > 0 &&
                            <div className="checkout-modal_footer">
                                <div className="totalAmount">
                                    <h4>Total Amount: </h4>
                                    <h4>{totalAmount}
                                        <span style={{marginLeft: "4px"}}>USD</span>
                                        </h4>
                                </div>
                                <button onClick={orderHandler}>Order Now</button>
                            </div>
                        }
                    </div>
                </Modal>
            }
            { orderModal && <OrderSuccessModal orderId={orderId} onClose={handleOrderModal}/> }
        </Fragment>
    )
}

export default Cart