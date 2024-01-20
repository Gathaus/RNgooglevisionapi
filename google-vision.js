import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const YOUR_API_KEY = 'AIzaSyB8RPFnB-3REc3sPTrkgbieQ5wkXT3OMck';

const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // resmi base64 formatında alır
    const base64Image = data.base64;

    try {
        const googleVisionRes = await axios.post(
            'https://vision.googleapis.com/v1/images:annotate',
            {
                requests: [
                    {
                        image: {
                            content: base64Image,
                        },
                        features: [
                            {
                                type: 'TEXT_DETECTION',
                                maxResults: 1,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${YOUR_API_KEY}`,
                },
            }
        );

        // Burada OCR sonucunu işleme ve puanlama kısmı olacak
        const detectedText = googleVisionRes.data.responses[0].fullTextAnnotation.text;
        console.log('Detected text:', detectedText);

        // Burada metni işleyip, belirli kelimeleri arayıp puanlayabilirsiniz.

    } catch (error) {
        console.error(error);
    }
};
