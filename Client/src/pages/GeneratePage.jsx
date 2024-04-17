import React from 'react'
import './CSS/GeneratePage.css'

const GeneratePage = () => {
  return (
    <div className='generate-page-container'>
      <div className="generate-left">
        <div className="preview-panel">
          <h1>Provide your preferences and get it generated here!</h1>
        </div>
        <h1 id='bottom-txt'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, magnam optio obcaecati est doloribus commodi, atque eaque pariatur itaque rerum voluptatibus omnis quam, consequuntur similique consectetur! Corporis reiciendis nam harum?</h1>
      </div>
      <div className="generate-right">
        <div className="form-panel">
          <div className='formlines-double'>
            <div>
              <label htmlFor="entercake">Enter cake type:</label>
              <input type="entercake" name="entercake" id="entercake" placeholder='eg: Cake, Cup Cake, Sweets' />
            </div>
            <div >
              <label htmlFor="entercat">Enter category:</label>
              <input type="entercat" name="entercat" id="entercat" placeholder='eg: Kids, Love Themed, Party' />
            </div>
          </div>
          <div className='formlines-double'>
            <div>
              <label htmlFor="enterflav">Enter flavor:</label>
              <input type="enterflav" name="enterflav" id="enterflav" placeholder='eg: Vanilla, Chocolate, Red Velvet' />
            </div>
            <div >
              <label htmlFor="entershape">Enter shape:</label>
              <input type="entershape" name="entershape" id="entershape" placeholder='eg: Round, Sqaure, Top Forward' />
            </div>
          </div>


          <div className='formlines-double'>
            <div>
              <label htmlFor="entercolor">Enter color:</label>
              <input type="entercolor" name="entercolor" id="entercolor" placeholder='eg: Red, Beige, Light Blue' />
            </div>
            <div>
              <label htmlFor="entericing">Enter icing:</label>
              <input type="entericing" name="entericing" id="entericing" placeholder='eg: Butter Cream, Fondant, Frosted' />
            </div>
          </div>

          <div className='formlines'>
            <label htmlFor="enterlnt">Enter layers & tiers count:</label>
            <input type="enterlnt" name="enterlnt" id="enterlnt" placeholder='eg: Two layers, Three Tiers, Two tiers and four layers' />
          </div>
          <div className='additonalarea'>
            <label htmlFor="enterdtls">Additional details: </label>
            <textarea name="enterdtls" id="enterdtls" placeholder='Enter more details, tell us how you want the cake to look like, what decorations would you like to apply?' cols="30" rows="10"></textarea>
          </div>
          <div className='generatebtn'>
            <button id='generate-btn'>Generate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratePage
