import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, requireNativeComponent, NativeModules, View, ViewPropTypes, Image , Platform, findNodeHandle } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import TextTrackType from './TextTrackType';
import FilterType from './FilterType';
import DRMType from './DRMType';
import VideoResizeMode from './VideoResizeMode';

const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
});

export { TextTrackType, FilterType, DRMType }

export default class RealtyVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPoster: !!props.poster,
        };
    }

    setNativeProps(nativePorps) {
        this._root.setNativeProps(nativePorps);
    }

    toTypeString(x) {
        switch(typeof x) {
            case 'object':
                return x instanceof Date ? x.toISOString() : JSON.stringify(x);
            case 'undefined':
                return '';
            default:
                return x.toString();
        }
    }

    seek = (time, tolerance=100) => {
        if (isNaN(time)) { throw new Error('Specified time not a number');}

        if (Platform.OS === 'ios') {
            this.setNativeProps({
                seek:{
                    time, tolerance,
                },
            });
        } else {
            this.setNativeProps({seek: time});
        }
    };

    presentFullScreenPlayer = () => {
        this.setNativeProps({})
    }
}