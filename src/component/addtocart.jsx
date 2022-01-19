import React from 'react'
import Table from './cart';


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            cart:[],
            // display:"none",
            totalAmount: 0, 
        }
    }
    componentDidMount() {
        fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then((response) => response.json())
            .then(productList => {
                this.setState({ product: productList });
            });
            const cart1 = localStorage.getItem('myCart')
            this.setState({cart: JSON.parse(cart1) ? JSON.parse(cart1) : []}, this.cartTotal)
    }
    componentDidUpdate(){
        localStorage.setItem('myCart', JSON.stringify(this.state.cart))
    }
   
    handleAddToCart(id, product) {
     
        const { cart } = this.state;
        const bookIndex = cart.findIndex(item => item.id === id);
       // console.log(bookIndex)
        if (bookIndex === -1) {
            //console.log("p")
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                qty: 1
            });
            //console.log(this.state.cart)
        }
        else {
            
            cart[bookIndex].qty++;
        }
        this.setState({
            cart,
            display:"inline"
        })
       
        this.cartTotal()
    };
    
    cartTotal = () => {
        let total = this.state.cart.reduce((total, item) => (total + (item.qty *(item.price))), 0);
        this.setState({
            totalAmount:total
        })
        
      }
    // updateCart = (cartData) => {
    //     this.setState({cart: cartData});
    // }
    remove=(index)=>{
        console.log(index, "item id");
        const items = this.state.cart.filter((item) =>item.id !== index)
      
      console.log(items)
        this.setState({ cart :items},
            ()=> this.cartTotal() )
  if(items.length==0){
      this.setState({display:"none"})
  }
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
                            <button key={index} onClick={() => this.handleAddToCart(product.id, product)}>Add To cart</button>
                        </div>
                    ))}

                </div>
          <Table value={this.state.cart} show={this.state.display} sumTotal={this.state.totalAmount} del={this.remove} onCartUpdate={this.updateCart}/>
            </>
        )
    }
}
export default Cart