//Hjælpemidler: https://www.youtube.com/watch?v=Mpr9UsdoiSU og ChatGPT

const form = document.querySelector('#travel-form');
const itineraryOutput = document.querySelector('#itinerary-output');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiKey = document.querySelector('#api-key').value;
    const cities = document.querySelector('#cities').value;
    const budget = document.querySelector('#budget').value;
    const days = document.querySelector('#days').value;
    const preferences = Array.from(document.querySelectorAll('#preferences input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);


    // Reset output
    itineraryOutput.textContent = 'Generating your itinerary...';

    // Fetch OpenAI itinerary
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a travel planner assistant who creates personalized travel itineraries.' },
                {
                    role: 'user',
                    content: `I want to plan an interrail trip. Here are my details:
                    - Cities: ${cities}
                    - Budget: €${budget}
                    - Number of Days: ${days}
                    - Preferences: ${preferences.join(', ')}
                    Please create an itinerary based on these details.`
                }
            ]
        })
    })
        .then(response => response.json())
        .then(data => {
            const itinerary = data.choices[0]?.message?.content || 'No itinerary generated.';
            itineraryOutput.textContent = itinerary;
        })
        .catch(error => {
            itineraryOutput.textContent = `Error: ${error.message}`;
        });
});
