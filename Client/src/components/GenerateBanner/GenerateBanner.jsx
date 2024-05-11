import React from 'react'
import './GenerateBanner.css'
import genCake from '../Assets/gen-cake.png'

const GenerateBanner = () => {

    const goToFunc = () => {
        window.location.replace("/generatecake");
    }

    return (
        <div className='generate-banner-container'>
            <div className="left-pane-gen">
                <div className="texts">
                    <h1>Don't have a design?</h1>
                    <h2 id='gen-txt'>" Generate " </h2>
                    <h2 id='gen-txt-botm'>your own design using our AI design generator!</h2>
                    <button onClick={() => { goToFunc() }}>Generate ›</button>
                </div>
            </div>
            <div className="right-pane-gen">
                <img src={genCake} alt="gen-cake" />
            </div>
        </div>
    )
}

export default GenerateBanner
