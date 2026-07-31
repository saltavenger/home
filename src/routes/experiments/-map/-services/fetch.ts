export async function getEJSData(LONGITUDE: number, LATITUDE: number, buffer: number) {
    try {
            const response = await fetch('https://api.ejanalysis.com/data', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sites: [{
                        lon: LONGITUDE,
                        lat: LATITUDE,
                    }],
                    buffer
                })
            });
            if (response.ok) {
                const data = await response.json();
                return data[0];
            } else {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (err) {
            throw err;
        }
}