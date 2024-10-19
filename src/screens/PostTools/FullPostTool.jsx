import React from "react";
import { Keyboard, Animated, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Image, Dimensions, ImageBackground, KeyboardAvoidingView, Touchable } from "react-native";
import { PanGestureHandler, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { FetchBgColorsRequest } from '../../actions/bgColorActions';
import * as Navigation from '../../rootNavigation';

class FullPostTool extends React.Component {
    constructor(props) {
        super(props);
        this._editorWrapperHeight = new Animated.Value(100);
        this.state = {
            selectedBgColorId: 0
        }
        this._isShowBgColors = true;
        this._bgColorListWidth = new Animated.Value(screenWidth - 60);
        this._toggleZindexValue = new Animated.Value(2);
        this._degTransformToggle = new Animated.Value(0);
        this._scaleTransfromToggle = new Animated.Value(0);
        this._isKeyboardVisible = false;
        this._distanceTopOption = new Animated.Value(0);
        this._prevTranslatetionY = 0
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardSidShow', this._keyboardDidShow.bind(this));
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
        const { fetchBgColors } = this.props;
        fetchBgColors();
    }

    _keyboardWillShow() {
        this._distanceTopOption.setValue(0);
        this._prevTranslatetionY = 0;
    }

    _keyboardDidShow() {
        this._isKeyboardVisible = true;
        if (!this._isShowBgColors) {
            Animated.timing(this._scaleTransfromToggle, {
                toValue: 0,
                duration: 100
            }).start(() => {
                this._toggleZindexValue.setValue(2);
                Animated.timing(this._degTransformToggle, {
                    toValue: 0,
                    duration: 200
                }).start( () => { } )
            });
            Animated.spring(this._bgColorListWidth, {
                toValue: screenWidth - 60,
                duration: 300,
            }).start(() => {
                this._isShowBgColors = true;
            });
        }
    }

    _keyboardDidHide() {
        this._isKeyboardVisible = false;
    }

    componentDidUpdate() {
        const { bgColors } = this.props;
        if (bgColors.length === 0) return;
        this.preloadBgImages(bgColors);
    }

    preloadBgImages(bgImages) {
        let preFetchTasks = [];
        for (let bgImg of bgImages) {
            if (!bgImg.isPureColor) {
                preFetchTasks.push(Image.prefetch(bgImg.bgImage_url));
            }
        }
        Promise.all(preFetchTasks).then((results) => {
            let downloadedAll = true;
            results.forEach((res) => {
                if (!res) {
                    downloadedAll = false;
                }
            });
        });
    }

    onPressGoBackHandler() {
        Navigation.goBack();
    }

    onGestureEventHandler({nativeElement}) {
        if (!this._isKeyboardVisible) {
            const { translationY } = nativeElement;
            if (this._prevTranslatetionY - translationY > 610) return;
            this._distanceTopOption.setValue(this._prevTranslatetionY - translationY);
        }
    }

    onContentSizeChangeHandler({nativeElement}) {
        const { height } = nativeElement.contentSize;
        Animated.timing(this._editorWrapperHeight, {
            toValue: height + 20,
            duration: 0
        }).start();
    }
    
    onHandlerStateChangeHandler({nativeEvent}) {
        if (this._isKeyboardVisible) return;
        if (nativeEvent.state === State.END) {
            let { translationY } = nativeEvent;
            translationY = this._prevTranslatetionY - translationY;
            if (Math.abs(translationY) < 150) {
                Animated.sprint(this._distanceTopOption, {
                    toValue: 0,
                    duration: 200
                }).start( () => this._prevTranslatetionY = 0)

            } else if (Math.abs(translationY) > 150 && Math.abs(translationY) < 350) {

                Animated.spring(this._distanceTopOption, {
                    toValue: 247.5,
                    duration: 200
                }).start(() => this._prevTranslatetionY = 247.5)
            }
        }
    }

    onSelectBgColorHandler(bgColorId) {
        this.setState({
            ...this.state,
            selectedBgColorId: bgColorId,
        })
    }

    onToggleBgColorListHandler() {
        if (!this._isShowBgColors) {
            Animated.timing(this._scaleTransfromToggle, {
                toValue: 0,
                duration: 100
            }).start(() => {
                this._toggleZindexValue.setValue(2);
                Animated.timing(this._degTransformToggle, {
                    toValue: 0,
                    duration: 200
                }).start(() => {});
            });

            Animated.sprint(this._bgColorListWidth, {
                toValue: screenWidth - 60,
                duration: 300,
            }).start(() => {
                this._isShowBgColors = true;
            });

        } else {
            Animated.timing(this._degTransformToggle, {
                toValue: -90,
                duration: 100,
            }).start(() => {
                this._toggleZindexValue.setValue(0);
                Animated.timing(this._scaleTransfromToggle, {
                    toValue: 1,
                    duration: 200
                }).start(() => {})
            });

            Animated.timing(this._bgColorListWidth, {
                toValue: 0,
                duration: 300,
            }).start(() => {
                this._isShowBgColors = false;
            })
        }
    }

    render() {
        if (this.props.route.params === undefined) this.props.route.params = {}
        const { isInGroup, groupDetail, isPostToAnyone, userX } = this.props.route.params;
        const {user, } = this.props
        const { bgColors } = this.props
        const bgColorListWidth = this._bgColorListWidth;
        const toggleZindexValue = this._toggleZindexValue;
        const degTransformToggle = this._degTransformToggle.interpolate({
            inputRange: [-90, 0],
            outputRange: ["-90deg", "0deg"]
        });
        const distanceTopOption = this._distanceTopOption.interpolate({
            inputRange: [-660, 0, 660],
            outputRange: [710, 50, -610]
        })

        const scaleTranformToggle = this._scaleTransfromToggle;
        if (bgColors.length === 0) return <View></View>
        const selectedBgColor = bgColors.filter((bgColor) => bgColor.id === this.state.selectedBgColorId)[0]
        const editorWrapperHeight = this._editorWrapperHeight;

        return (
            <>
            <KeyboardAvoidingView>
                <SafeAreaView>
                    <View>
                        <TouchableOpacity>
                            <FA5Icon></FA5Icon>
                        </TouchableOpacity>

                        <Text></Text>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Image></Image>
                        <View>
                            <Text></Text>
                            <View>
                                <TouchableOpacity>
                                    <FA5Icon></FA5Icon>
                                    <Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FA5Icon></FA5Icon>
                                    <Text></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {selectedBgColor && 
                    <ImageBackground>
                        <Animated.View>
                            <TextInput></TextInput>
                        </Animated.View>
                    </ImageBackground>
                    }

                    <Animated.View>
                        <View>
                            <TouchableWithoutFeedback>
                                <Animated.Image></Animated.Image>
                                <Animated.Image></Animated.Image>
                            </TouchableWithoutFeedback>

                            <Animated.View>
                                <ScrollView>

                                    {bgColors.map((bgColor, index) => {
                                        <View>
                                        {bgColor.isPureColor && 
                                            <TouchableWithoutFeedback>
                                                <View></View>
                                            </TouchableWithoutFeedback>
                                        }
                                        {!bgColors.isPureColor &&
                                            <TouchableWithoutFeedback>
                                                <Image></Image>
                                            </TouchableWithoutFeedback>
                                        }
                                    </View>
                                    })}

                                </ScrollView>
                                <TouchableWithoutFeedback>
                                    <Image></Image>
                                </TouchableWithoutFeedback>

                            </Animated.View>
                        </View>

                        <PanGestureHandler>

                            <Animated.View>

                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text></Text>
                                        <View>
                                            <Image></Image>
                                            <Image></Image>
                                            <Image></Image>
                                            <Image></Image>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View>
                                        <Image></Image>
                                        <Text></Text>
                                    </View>
                                </TouchableOpacity>

                            </Animated.View>

                        </PanGestureHandler>

                    </Animated.View>

                </SafeAreaView>
            </KeyboardAvoidingView>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        bgColors: state.bgColors,
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchBgColors: () => dispatch(FetchBgColorsRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(FullPostTool)
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);