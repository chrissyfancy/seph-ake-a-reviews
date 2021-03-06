import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingField = props => {
  return (
    <div>
      <label className="new-rating">Rating</label>
      <StarRatingComponent
        name="new-review-rating"
        value={props.value}
        onStarClick={props.onStarClick}
        renderStarIcon={(index, value) => {
          return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
        }}
        renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
      />
    </div>
  );
}

export default RatingField;
