const { Client } = require("@googlemaps/google-maps-services-js")

const getReviews = async (req, res) => {
   
    try {
        const client = new Client({})
        const response = await client.placeDetails({
            params: {
                place_id: process.env.PLACE_ID,
                key: process.env.PLACE_API_KEY
            }
        })
    
        return res.status(200).json({ reviews: response.data.result.reviews })
    } catch (error) {
        console.log(`Error occured in ${__filename}: `, error)
        return res.status(500).json({ message: "Error occurred" })
    }
    
}

module.exports = { getReviews }