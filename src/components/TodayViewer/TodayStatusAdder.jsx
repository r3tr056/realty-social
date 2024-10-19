import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScaledImage from '../../ScaledImage';

import * as navigation from '../../../rootNavigation';
import { TabActions } from '@react-navigation/native';

export default class TodayStatusAdder extends React.Component {
    constructor(props) {
        super(props)
    }

    onPressHandle() {
        console.log("click");
        const { story, position } = this.props;
        navigation.navigate("StatusDetail", {
            position: position
        })
    }

    render() {
        const { user } = this.props;

        return (
            <View style={styles.container} >
                <TouchableOpacity activeOpacity={0.8} onPress={this.onPressHandle.bind(this)}>
                    <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.imageBg} source={{uri: user.avatar_2d_url}}>
                        <View style={styles.iconWrapper}>
                            <Icon name="plus" size={24} color='#318bfb'/>
                        </View>
                    </ImageBackground>
                    <View style={styles.nameWrapper}>
                        <Text>Add your Status</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 5,
    },

    imageBg: {
        position: 'relative',
        height: 250,
        width: 150,
    },

    iconWrapper: {
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 50,
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    avatar: {

    },

    nameWrapper: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },

    name: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 10
    }
})