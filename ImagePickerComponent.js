import RNFS from 'react-native-fs';
import React, { useState } from 'react';
import { Button, Image, View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ImagePickerComponent = ({ onImagePicked }) => {
    const [imagePath, setImagePath] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const captureImage = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 400,
            maxHeight: 400,
            quality: 1,
            saveToPhotos: true,
            base64: true
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                console.log('Camera not available!');
                return;
            } else if (response.errorCode === 'permission') {
                console.log('Permission denied!');
                return;
            } else if (response.errorCode === 'others') {
                console.log('Error:', response.errorMessage);
                return;
            }


            RNFS.readFile(response.assets[0].uri, 'base64').then((base64String) => {
                setImagePath(response.assets[0].uri);
                onImagePicked(base64String);
                hideModal();
            }).catch((err) => {
                console.log(err);
            });
        });
    };

    const chooseImage = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 400,
            maxHeight: 400,
            quality: 1,
            base64: true
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                console.log('Camera not available!');
                return;
            } else if (response.errorCode === 'permission') {
                console.log('Permission denied!');
                return;
            } else if (response.errorCode === 'others') {
                console.log('Error:', response.errorMessage);
                return;
            }

            RNFS.readFile(response.assets[0].uri, 'base64').then((base64String) => {
                setImagePath(response.assets[0].uri);
                onImagePicked(base64String);
                hideModal();
            }).catch((err) => {
                console.log(err);
            });
        });
    };

    return (
        <View>
            {imagePath ? (
                <TouchableOpacity onPress={showModal}>
                    <Image source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={showModal}>
                    <Text>Pick an image</Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select profile photo</Text>

                        <TouchableOpacity onPress={chooseImage} style={styles.optionButton}>
                            <Text>Choose photo from album</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={captureImage} style={styles.optionButton}>
                            <Text>Take photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={hideModal} style={styles.cancelButton}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 8,
    },
    optionButton: {
        paddingVertical: 8,
    },
    cancelButton: {
        paddingTop: 15,
        alignSelf: 'center',
    },
    modalTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'gray',
        paddingBottom: 20,
    },
});

export default ImagePickerComponent;
