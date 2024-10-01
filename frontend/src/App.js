import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  API_URL = "http://localhost:5253/";

  componentDidMount() {
    this.refreshProducts();
  }

  async refreshProducts() {
    try {
      const response = await fetch(this.API_URL + "api/v1/products", {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ products: data });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <h1>Dagnys Bullar</h1>

        {products.map(product =>
          <div key={product.Id}>
            <h3>{product.Name}</h3>
            <p>{product.Description}</p>
            <p>{product.Price} kr</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
