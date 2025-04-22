import React from "react";
import "./rating.css";

const reviews = [
  {
    name: "Samantha D.",
    date: "August 14, 2023",
    rating: 5,
    review: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
  },
  {
    name: "Alex M.",
    date: "August 15, 2023",
    rating: 5,
    review: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
  },
  {
    name: "Ethan R.",
    date: "August 16, 2023",
    rating: 4.5,
    review: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
  },
  {
    name: "Olivia P.",
    date: "August 17, 2023",
    rating: 5,
    review: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."
  },
  {
    name: "Liam K.",
    date: "August 18, 2023",
    rating: 5,
    review: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."
  },
  {
    name: "Ava H.",
    date: "August 19, 2023",
    rating: 4.5,
    review: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
  }
];

const Rating = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i}>&#9733;</span> // Full star unicode
        ))}
        {halfStar && <span>&#189;</span>}
      </div>
    );
  };

  return (
    <div className="rating-container">
      <h2>All Reviews (451)</h2>
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              {renderStars(review.rating)}
              <span className="more-icon">&#8942;</span> {/* Ellipsis icon */}
            </div>
            <h3>{review.name} <span style={{color: 'green'}}>&#10003;</span></h3> {/* Check mark */}
            <p>{review.review}</p>
            <span>Posted on {review.date}</span>
          </div>
        ))}
      </div>
      <button className="load-more">Load More Reviews</button>
    </div>
  );
};

export default Rating;