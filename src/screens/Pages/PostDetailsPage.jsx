import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableOpacityFeedback, Dimensions, Animated } from 'react-native';
import Modal from 'react-native-modal';
// React-Redux app state management
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as navigation from '../../rootNavigation';
import { FetchPagePostDetailRequest } from '../../actions/pageDetailActions';

class PostDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDisplay: 'flex'
        }
        this._isLiked = { isLiked: false };
        this.optionBottom = new Animated.Value(-screenHeight);
    }

    componentDidMount() {
        const { postId } = this.props.route.params;
        const { fetchPagePostDetail } = this.props;
        fetchPagePostDetail(postId);
    }

    onPressOptionIconHandler() {
        Animated.timing(this.optionBottom, {
            toValue: 0,
            duration: 300
        }).start();
    }

    onPressProfileLinkHandler() {

    }

    onPressCommentsHandler() {
        const { postDetail } = this.props;
        const { comments } = postDetail;
        navigation.navigate('comments-popup', {
            comments
        })
    }

    onPressBackdropOptionListHandler() {
        Animated.timing(this.optionBottom, {
            toValue: -screenHeight,
            duration: 400
        }).start();
    }

    onPressReactionValueHandler() {

    }

    render() {
        const { postDetail } = this.props;
        if (!postDetail.hasOwnProperty('id')) return <View></View>
        let reactionValue = 0;
        for (let emoji in postDetail.reactions) {
            reactionValue += postDetail.reactions[emoji];
        }

        const optionBottom = this.optionBottom;
        return (
            <TouchableOpacityFeedback onPress={this.onPressHideDetailWrapperHandler.bind(this)}>
                <View style={styles.postWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image}>
                        </Image>
                    </View>
                    <View style={{...styles.optionIconWrapper, display: this.state.detailDisplay }}>
                        <TouchableOpacity style={styles.cycleWrapper} onPress={this.onPressOptionIconHandler.bind(this)}>
                            <FontAwesome5Icon name="ellipsis-v" color="#fff" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{...styles.optionListWrapper, bottom: optionBottom}}>
                        <View style={styles.optionBackDrop}>
                            <TouchableOpacity>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <View>
                                    <FontAwesome5Icon></FontAwesome5Icon>
                                    <Text></Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View>
                                    <FontAwesome5Icon></FontAwesome5Icon>
                                    <Text></Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </Animated.View>
                </View>
            </TouchableOpacityFeedback>
        )
    }
}

const styles = StyleSheet.create({

})