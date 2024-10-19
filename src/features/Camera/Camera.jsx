import React, { Component, useEffect } from 'react';
import { Animated, Button, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ExTouchableOpacity from '../../components/ExTouchableOpacity';
import Camera from '../../screens/Camera';

class CameraTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: Camera.Constants.Type.back,
            isOnFlash: false,
            isTaked: false,
            picture: {}
        }
    }

    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {}
        else Alert.alert('Can not access to camera');
    }

    onPressToggleFlashHandler() {
        this.setState({
            ...this.state,
            isOnFlash: !this.state.isOnFlash
        });
    }

    async onPressTakePhotoHandler() {
        const picture = await this.camera.takePictureAsync();
        this.setState({
            isTaked: true,
            picture
        })
    }

    onPressSwitchCameraHandler() {
        this.setState({
            ...this.state,
            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        });
    }

    onPressBackHandler() {
        navigation.goBack();
    }

    render() {
        const { type, isOnFlash } = this.state;
        const { systemImages } = this.props;
        const displayImageUri = systemImages[0]?.uri;
        const flashMode = isOnFlash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off;
        const flashImage = isOnFlash ? require('../assets/icons/flash_on.png') : require('../assets/icons/flash_off.png');

        return (
            <View style={styles.container}>
                <Camera flashMode={flashMode}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.container} type={type}>
                    <View style={styles.cameraToolWrapper}>
                        <View style={styles.navigatorBar}>
                            <ExTouchableOpacity onPress={this.onPressBackHandler}>
                                <FontAwesome5Icon name="times" size={24} color="#fff" />
                            </ExTouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome5Icon name="cog" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomTool}>
                            <View style={styles.mainTool}>
                                <TouchableOpacity>
                                    <Image style={styles.gallery} source={{uri: displayImageUri }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressToggleFlashHandler.bind(this)}>
                                    <Image source={flashImage}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressTakePhotoHandler.bind(this)} style={styles.btnTakePhoto}>
                                    <View style={styles.realBtnTakePhoto}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressSwitchCameraHandler.bind(this)}>
                                    <Image source={require('../../assets/icons/switch-camera.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/icons/emoji.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})