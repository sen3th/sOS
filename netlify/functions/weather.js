exports.handler = async function(event, context) {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = event.queryStringParameters.city;

    if (!city) {
        return{
            statusCode: 400,
            body: JSON.stringify({error: "City parameter is required"})
        };
    }   

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch weather data"})
        }
    }

    
}