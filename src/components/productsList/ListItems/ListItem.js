import CartIcon from "../../../assets/icons/add-to-cart.svg"
import {Fragment, useState} from 'react';
import Modal from '../../UI/modal';
import { addItemHandler, removeItemHandler } from "../../../actions"
import { useDispatch, useSelector } from "react-redux"


const ListItem = ({data}) =>{

    const [showModal,setShowModal] = useState(false)
    const item = useSelector(state => state.cart.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

    const increaseCounterByOne = (event) => {
        event.stopPropagation()
        dispatch(addItemHandler(data))
    }

    const decreaseCounterByOne = (event) => {
        event.stopPropagation()
        dispatch(removeItemHandler(data.id))
    }
    
    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    return (
        <Fragment>
        <div onClick={handleModal} className={"cardItem"}>
            <img className={"productImg"} src={data.thumbnail} alt={data.title} ></img> 
            <div className={"cardItem_info"}>
                <div className={"price"}>
                <span>${data.discountedPrice}</span>
                <small><strike>${data.price}</strike></small>
                </div>
            <div className="title">
                <h4>{data.title}</h4>
            </div>
            </div>{
                !item || item?.quantity < 1 ?  <button className={"cartButton"} onClick={increaseCounterByOne}>
                               <span>Add to Cart</span>
                               <img src={CartIcon} alt="Cart Icon"/>
                               </button>
                            :
                            <div className={"cart-addon"}>
                            <button onClick={decreaseCounterByOne}><span>-</span></button>
                            <span className={"counter"}>{item.quantity}</span>
                            <button onClick={increaseCounterByOne}><span>+</span></button>
                            </div>
                }
        </div>
        {showModal && <Modal onClose={handleModal}>
        <div className="item-card__modal">
            <div className="img-wrap">
                <img className={"img-fluid"} src={data.thumbnail} alt={data.title}/>
            </div>
            <div className="meta">
                <h3>{data.title}</h3>
                <div className={"pricing"}>
                    <span>${data.discountedPrice} </span>
                    <small>
                        <strike>${data.price}</strike>
                    </small>
                </div>
                <p>{data.description}</p>
                {
                    !item || item?.quantity < 1 ?
                    <button className={"cartButton card-add__modal"} onClick={increaseCounterByOne}>
                    <span>Add to Cart</span>
                    <img src={CartIcon} alt="Cart Icon"/>
                    </button>
                    :
                    <div className="cart-addon card-addon__modal">
                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                    <span>{item.quantity}</span>
                    <button onClick={increaseCounterByOne}><span>+</span></button>
                    </div>
                }
                </div>
                </div>
                </Modal>}
        </Fragment>
    )
}

export default ListItem