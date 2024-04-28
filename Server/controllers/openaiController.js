const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});



const generateImage = async (req, res) => {
    try {
        const response = await openai.images.generate({
            // model: 'dall-e-2',
            prompt: 'cute dinosaur cup cake',
            n: 1,
            size: "1024x1024"
        });

        image_url = response.data[0].url

        res.status(200).json({
            success: true,
            data: image_url
        })

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'Image cannot be generated'
        })
    }
}

module.exports = { generateImage };