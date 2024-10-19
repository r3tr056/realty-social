import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { notificationsTypes, SCREEN_WIDTH, reactionTypes } from '../../constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ExTouchableOpacity from '../ExTouchableOpacity';
import { navigation } from '../../rootNavigation';
import { connect } from 'react-redux';

class NotificationItem extends Component {
    constructor(props) {
        super(props);
    }

    onShowNotificationOptionsHandler(description) {
        const { item } = this.props;
        navigation.navigate('notification-options', {
            notification: item,
            description
        })
    }

    render() {
        const { item } = this.props;
        let displayAvatarUri, Description, icon;
        if (item.type === notificationsTypes.NEW_PHOTO_IN_GROUP || item.type === notificationsTypes.NEW_POST_IN_GROUP) displayAvatarUri = item.group.avatar_url
        else displayAvatarUri = item.user.avatar_url
        let iconName, iconColor;
        switch()
    }
}