
const API_URL = 'https://vision.googleapis.com/v1/images:annotate';

const callGoogleVisionApi = async (base64Image) => {
    const apiKey = 'AIzaSyB8RPFnB-3REc3sPTrkgbieQ5wkXT3OMck';
    console.log("base64Image to vision api")
    console.log(base64Image)
    const body = JSON.stringify({
        requests: [
            {
                image: {
                    content: base64Image,
                },
                features: [
                    { type: 'TEXT_DETECTION' }, // Use DOCUMENT_TEXT_DETECTION for dense text
                ],
            },
        ],
    });

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });

    const json = await response.json();
    console.log(json);
    if(response.ok) {
        const detectedText = json.responses[0].fullTextAnnotation.text;
        console.log("detectedText from vision api")
        console.log(detectedText);
        return detectedText;
    } else {
        console.error(json.error.message);
        throw new Error(json.error.message);
    }
};

export default callGoogleVisionApi;
