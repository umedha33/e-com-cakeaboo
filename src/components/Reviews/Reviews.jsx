import React from 'react'
import './Reviews.css'
import personImg from '../Assets/person-circle2.png'
import topcom from '../Assets/top-com.png'
import bottomcom from '../Assets/bottom-com.png'
import dummyReviews from '../Assets/dummy-reviews.js'

const Reviews = () => {

    return (
        <div className='reviews-container'>
            <h1>Customer Feedbacks</h1>
            <div className="feedback-cards">
                {dummyReviews.map(review => (
                    <div key={review.id} className="single-card">
                        <img id='person-img' src={personImg} alt="person-img" />
                        <div className="desc-section">
                            <img id='top-com' src={topcom} alt="top-com" />
                            <p>{review.review}</p>
                            <img id='bottom-com' src={bottomcom} alt="bottom-com" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews
