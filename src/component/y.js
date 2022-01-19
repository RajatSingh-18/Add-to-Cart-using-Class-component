import React from 'react'
import Table from './cart';


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            cart: [],
            display:"none",
            Total:0,
            totalAmount:0
        }
    }
    componentDidMount() {
        fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then((response) => response.json())
            .then(productList => {
                this.setState({ product: productList });
            });
    }

    addtoCart = (product) => {
        this.setState({
          cart: this.state.cart.concat(product)
        });
        this.setState({
            display:"inline"
        })
        
        console.log(this.state.cart);
      };
    
      sumTotalAmount(){
        let total = 0;
        let cart = this.props.value;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        })
    }
    render() {
        return (
            <>

                <div className="cart">

                    {this.state.product.map((product, index) => (
                        <div key={product.id} className="cart-items">
                            <h4>{product.title}</h4>
                            <div><img src={product.image} /></div>
                            <p>{product.price + "Rs"}</p>
                            <button key={index} onClick={() => this.addtoCart(product)}>Add To cart</button>
                       
                        </div>
                    ))}

                </div>
         
          <Table value={this.state.cart} show={this.state.display} />
            </>
        )
    }
}
export default Cart