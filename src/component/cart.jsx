import React from 'react'

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalAmount:0,
            items:this.props.cart
         
        }
    }
    
  
  
    render() {   
        return (
            <>
                {/* {console.log(this.props.value, "hello")} */}
                <div style={{ display: this.props.show }} className="cartproduct">
                    <h1>Cart</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                this.props.value.map((index) => {
                                    let a=index.price
                                    return (
                                        <tr>
                                            <td>{index.title}</td>
                                            <td>{index.price}</td>
                                            <td>{index.qty}</td>
                                          
                                            <td><button onClick={()=>this.props.del(index.id)} >Delete</button></td>
                                        </tr>
                                    )
                                })
                                
                            }
                        </tbody>
                    </table>
                    <div>

                  
                    {"Total:"+this.props.sumTotal.toFixed(2)}
                    </div>
                </div>
            </>
        )
    }
}
export default Table