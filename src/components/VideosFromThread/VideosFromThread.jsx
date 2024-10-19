import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import VideoPlayer from '../VideoPlayer';
import { SCREEN_WIDTH, SCREEN_HEIGHT, permission } from '../../constants';
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Animated } from 'react-native';
import * as navigation from '../../logic/rootNavigation';
import { PushThreadHeightMap } from '../../logic/watchVideosActions';

class VideoThreadItem extends React.Component {
    constructor(props) {
        super(props);
        this._videoRef = new Animated.ValueXY({
            x: 0,
            y: 0
        })
        this._isShowOptions = false;
        this.threadHeightMap = [];
    }

    onRefReadyHandler(ref) {
        this._videoRef = ref;
    }

    componentDidMount() {
        // NOTHING HERE
    }

    componentWillUnmount() {
        this.threadHeightMap = [];
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { video } = this.props
        const { threadWatchingController } = nextProps
        this.threadHeightMap = nextProps.threadHeightMap;
        let nextVideo = { ...nextProps.video };
        if (threadWatchingController.playingId === video.id && threadWatchingController.isPlaying) {
            this._videoRef.play();
        }
        else {
            this._videoRef.pause();
        }
        return JSON.stringify(video) !== JSON.stringify(nextVideo);
    }

    // Comment button press handler
    onPressCommentsHandler() {
        const { video } = this.props
        const { comments } = video;
        navigation.navigate('comments-popup', {
            comments
        })
    }

    onPressOptionIconHandler() {
        if (this._isShowOptions) {
            this._isShowOptions = false
            Animated.timing(this.optionsLayout, {
                toValue: {
                    x: 0, y: 0
                },
                duration: 400
            }).start();
        } else {
            this._isShowOptions = true;
            Animated.spring(this.optionsLayout, {
                toValue: {
                    // 60%
                    x: SCREEN_WIDTH * 0.6,
                    y: 340
                },
                duration: 400
            }).start();
        }
    }

    onThreadItemLayoutHandler({nativeEvent}) {
        const { height } = nativeEvent.layout;
        const { video, PushThreadHeightMap } = this.props;
        if (typeof pushThreadHeightMap === 'function') {
            pushThreadHeightMap(video.id, height);
        }
    }

    onVideoFinishHandler() {
        const { video, scrollToItem} = this.props
        const videoid = video.id;
        scrollToItem(videoid);
    }

    // The Layout
    render() {
        console.log("Rendering VideoThreadPlayer");
        const { video, threadWatchingController } = this.props;
        let shouldPlay = false;
        shouldPlay = threadWatchingController.playingId === video.id && threadWatchingController.isPlaying;
        const vidSrc = { uri: video.video.video_uri }
        let reactionValue = 0;
        for (let emoji in video.reactions) {
            reactionValue += video.reactions[emoji];
        }

        return (
            <View>
                <View>
                    <Image style={styles.pageAvatar} source={{uri: video.page.avarat_uri}}/>
                    <View style={styles.centerInfoWrapper}>
                        <View style={styles.centerInfoUp}>
                            <TouchableOpacity>
                                <Text style={styles.pageName}>{video.page.name}</Text>
                            </TouchableOpacity>
                            <Text style={{color: '#318bfb'}}> • </Text>
                            <TouchableOpacity>
                                <Text style={{color: '#318bfb'}}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerInfoDown}>
                            <Text style={{color: '#333'}}>{video.create_at}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})