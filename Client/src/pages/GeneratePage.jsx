import React, { useState } from 'react'
import './CSS/GeneratePage.css'

const GeneratePage = () => {
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    entercat: '',
    entercake: '',
    enterflav: '',
    entershape: '',
    entercolor: '',
    entericing: '',
    enterlnt: '',
    enterdtls: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    const prompt = "One " + formInputs.entercat + " " + formInputs.entercake + " that is " + formInputs.enterflav + " flavored " + formInputs.entershape + " shaped " + formInputs.entercolor + " color " + formInputs.entericing + " " + formInputs.enterlnt + " and " + formInputs.enterdtls;
    console.log("Generated Prompt:", prompt);

    try {
      const response = await fetch('http://localhost:4000/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
      });
      const data = await response.json();
      console.log("Image URL:", data.data);
      setGeneratedImage(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsLoading(false);
    }
  }

  return (
    <div className='generate-page-container'>
      <div className="generate-left">
        <div className="preview-panel">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : generatedImage ? (
            <div className='gencont'>
              <img src={generatedImage} alt="Generated Cake" />
            </div>
          ) : (
            <h1>Provide your preferences and get it generated here!</h1>
          )}
        </div>
        <h1 id='bottom-txt'>Kindly complete the form with all pertinent details, including your preferences and requirements, to ensure we can tailor the cake design precisely to your needs. Your input is invaluable in crafting the perfect cake for your special occasion!</h1>
      </div>
      <div className="generate-right">
        <div className="form-panel">
          <div className='formlines-double'>
            <div >
              <label htmlFor="entercat">Enter category:</label>
              <input type="entercat" name="entercat" id="entercat" placeholder='eg: Kids, Love Themed, Party' onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="entercake">Enter cake type:</label>
              <input type="entercake" name="entercake" id="entercake" placeholder='eg: Cake, Cup Cake, Sweets' onChange={handleInputChange} />
            </div>
          </div>
          <div className='formlines-double'>
            <div>
              <label htmlFor="enterflav">Enter flavor:</label>
              <input type="enterflav" name="enterflav" id="enterflav" placeholder='eg: Vanilla, Chocolate, Red Velvet' onChange={handleInputChange} />
            </div>
            <div >
              <label htmlFor="entershape">Enter shape:</label>
              <input type="entershape" name="entershape" id="entershape" placeholder='eg: Round, Sqaure, Top Forward' onChange={handleInputChange} />
            </div>
          </div>


          <div className='formlines-double'>
            <div>
              <label htmlFor="entercolor">Enter color:</label>
              <input type="entercolor" name="entercolor" id="entercolor" placeholder='eg: Red, Beige, Light Blue' onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="entericing">Enter icing:</label>
              <input type="entericing" name="entericing" id="entericing" placeholder='eg: Butter Cream, Fondant, Frosted' onChange={handleInputChange} />
            </div>
          </div>

          <div className='formlines'>
            <label htmlFor="enterlnt">Enter layers & tiers count:</label>
            <input type="enterlnt" name="enterlnt" id="enterlnt" placeholder='eg: Two layers, Three Tiers, Two tiers and four layers' onChange={handleInputChange} />
          </div>
          <div className='additonalarea'>
            <label htmlFor="enterdtls">Additional details: </label>
            <textarea name="enterdtls" id="enterdtls" placeholder='Enter more details, tell us how you want the cake to look like, what decorations would you like to apply?' onChange={handleInputChange} cols="30" rows="10"></textarea>
          </div>
          <div className='generatebtn'>
            <button id='generate-btn' onClick={handleSubmit}>Generate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratePage
