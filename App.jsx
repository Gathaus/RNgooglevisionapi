// App.js
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent';
import callGoogleVisionApi from './GoogleVisionApi';

const App = () => {
    const [detectedText, setDetectedText] = useState('');

    const handleImagePicked = async (base64Image) => {
        console.log("base64Image");
        console.log(base64Image);
        const text = await callGoogleVisionApi(base64Image);
        setDetectedText(text);
    };

    return (
        <SafeAreaView>
            <ImagePickerComponent onImagePicked={handleImagePicked} />
            <Text>{detectedText}</Text>
        </SafeAreaView>
    );
};

export default App;
