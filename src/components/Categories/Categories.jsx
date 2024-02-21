import React from 'react'
import './Categories.css'
import dummyCategories from '../Assets/dummy-categories.js'

const Categories = () => {

    return (
        <div className='categories-container'>
            <h1>Categories</h1>
            <div className="category-container">
                {dummyCategories.map(category => (
                    <div key={category.id} className="category">
                        <img src={category.image} alt={category.catname} />
                        <div className="category-details">
                            <h3>{(category.catname).replace("-", " ")}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
