import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "Shopping Cart ";

function App() {
    const [products, setProducts] = useState();
    const [value, setValue] = useState(0);
    const [emptyFlag, setEmptyFlag] = useState(false);
    const [cart, setCart] = useState({
        items: [],
        subTotal: 0,
        totalPrice: 0,
        discount: 0,
        selectedCoupon: '0',
    });

    const addToCart = index => {
        //console.log("calling addToCart...");
        let cartList = { ...cart };
        let objIndex = cartList.items.findIndex((obj => obj.id === products[index].id));
        if(objIndex >= 0){
            cartList.items[objIndex].price = cartList.items[objIndex].price + products[index].price;
            cartList.items[objIndex].quantity = ++cartList.items[objIndex].quantity;
        }else{
            cartList.items.push({
                id: products[index].id,
                price: products[index].price,
                item: products[index].heading,
                quantity: 1,
            });
        }
        let price = cartList.items.reduce((accum, item) => accum + item.price, 0);
        cartList.subTotal = price;
        cartList.discount = value;
        cartList.totalPrice = cartList.subTotal - cartList.discount;       
        setCart(cartList);
        setEmptyFlag(false);
    }

    const removeFromCart = index => { 
        //console.log("calling removeFromCart...");     
        let objIndex = cart.items.findIndex(item => item.id === products[index].id);
        let cartList = { ...cart };
        if(objIndex >= 0){           
            cartList.items[objIndex].price = cartList.items[objIndex].price - products[index].price;
            cartList.items[objIndex].quantity = --cartList.items[objIndex].quantity;
            if(cartList.items[objIndex].quantity <= 0){
                cart.items.splice(objIndex, 1);
            }
            let price = cartList.items.reduce((accum, item) => accum + item.price, 0);
            cartList.subTotal = price;
            cartList.discount = value;
            cartList.totalPrice = cartList.subTotal - cartList.discount;
            setCart(cartList);
        }
    }

    const updateCoupon = argValue => {
        //console.log("calling updateCoupon...");
        let cartList = { ...cart };
        cartList.subTotal = cartList.items.reduce((accum, item) => accum + item.price, 0)
        if(cartList.subTotal > 0){
            cartList.discount = argValue;
            cartList.totalPrice = cartList.subTotal - cartList.discount;
            setValue(argValue);
            setCart(cartList);
        }else{
            setEmptyFlag(true);
        }
    }

    useEffect(()=>{
        //console.log("calling useEffect...");
        const updatedProducts = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            product.isAddcart = false;
            return product;
        })
        setProducts(updatedProducts)
    });
    return (
        <div>
            <nav className="app-header layout-row align-items-center justify-content-center">
                <div className="layout-row align-items-center">
                    <h4 id="app-title" data-testid="app-title" className="app-title">{title}</h4>
                </div>
            </nav>
            <div className="layout-row shop-component">
                <ProductList products={products} addToCart={addToCart} removeFromCart={removeFromCart} />
                <Cart cart={cart} updateCoupon={updateCoupon} flag={emptyFlag}/>
            </div>
        </div>
    );
}

export const PRODUCTS = [
    {
        heading: "Cap - $10",
        name: "Cap",
        price: 10
    },
    {
        heading: "Hand Bag - $30",
        name: "HandBag",
        price: 30
    },
    {
        heading: "Shirt - $30",
        name: "Shirt",
        price: 30
    },
    {
        heading: "Shoes - $50",
        name: "Shoe",
        price: 50
    },
    {
        heading: "Pant - $40",
        name: "Pant",
        price: 40
    },
    {
        heading: "Slipper - $20",
        name: "Slipper",
        price: 20
    }
];
export default App;
