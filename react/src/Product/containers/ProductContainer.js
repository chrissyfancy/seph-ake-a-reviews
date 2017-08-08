import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ReviewContainer from './ReviewContainer';
import ProductDetails from './components/ProductDetails'

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      product: '',
      reviews: [],
      rating: 0,
      productId: ''
    }
    this.addNewReview = this.addNewReview.bind(this);
  }

  componentDidMount() {
    let rootDiv = document.getElementById("react-app")
    let productId = rootDiv.dataset.productId
    let currentUserId = rootDiv.dataset.currentUserId

    fetch(`/api/v1/products/${productId}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ product: body.product, reviews: body.reviews, rating: body.rating, productId: productId });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewReview(review) {
    fetch(`/api/v1/products/${this.state.productId}/reviews`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    })
    .then(response => {
      if (response.ok) {
        return response;
    } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
      })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ reviews: this.state.reviews.concat(responseData)})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div>
        <ProductDetails product={this.state.product} />
        <ReviewContainer reviews={this.state.reviews} addNewReview={this.addNewReview} />
      </div>
    )
  }
}

export default ProductContainer
