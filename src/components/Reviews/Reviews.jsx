import React, { useState } from 'react';
import './Reviews.css';
import personImg from '../Assets/person-circle2.png';
import topcom from '../Assets/top-com.png';
import bottomcom from '../Assets/bottom-com.png';
import dummyReviews from '../Assets/dummy-reviews.js';

const Reviews = () => {
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        if (startIndex < dummyReviews.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className='reviews-container'>
            <h1>Customer Feedbacks</h1>

            <div className="nav-cards-panel">
                <button id='left-btn' onClick={handlePrev}>‹</button>

                <div className="corousel-pane">
                    <div className="feedback-cards" style={{ transform: `translateX(-${startIndex * (100 / dummyReviews.length)}%)` }}>
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

                <button id='right-btn' onClick={handleNext}>›</button>
            </div>



        </div>
    );
};

export default Reviews;
