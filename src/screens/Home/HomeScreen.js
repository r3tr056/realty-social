import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, StatusBar, SafeAreaView, ScrollView, Image, FlatList, ListItem, Dimensions, TouchableOpacity} from 'react-native'
import { Icon, Button} from 'react-native-elements';
import { thisExpression} from '@babel/types';

import axios from 'axios';
import LinerGradient from 'react-native-linear-gradient';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a: null}
    }

    componentDidMount() {
        const { fetchPosts, postLogin } = this.props;
        fetchPosts();
        postLogin();
    }

    getPageData = () => {
        console.log(1);
        axios.get('#url to fetch data from')
            .then(data => {
                return data.data
            }).then((e) => {
                console.log(e)
                let a = e.map((item, key) => {
                    return (
                        <View style={{marginRight: 17}}>
                            <LinerGradient colors={['#9E4791', '#C94F62','#EBB780']}
                                style={styles.gradientStyle}
                            >
                                <View style={styles.postView}>
                                    <Image source={{uri: item.download_url}} style={styles.postImage}/>
                                </View>
                            </LinerGradient>
                            <Text style={styles.postCap}>{item.author.replace(/. */, '')}</Text>
                        </View>
                    )
                })
                this.setState({a: a})
            })
    }

    render() {
        const {navigation} = this.props;
        const { posts } = this.props;
        if (posts.length === 0) return <View></View> 

        return (
            <View style={styles.homeContainer}>
                <View style={styles.homeContent}>
                    <StatusBar backgroundColor='#F9F9F9' barStyle='dark-content'></StatusBar>
                    <SafeAreaView style={styles.safeAreaStyle}>
                        <HomeScreenHeader/>
                        
                        <Text style={styles.greetingText}>Hello, {data?.username}</Text>
                        <Text style={styles.headStart}>Get yourself involved in the new way of social</Text>

                        <View style={styles.mainViewStyle}>
                            <ScrollView bounces={false} style={styles.listContainer}>
                                {/* Stories */}
                                <Stories></Stories>
                                {/* Posts - Simple Map*/}
                                {posts.map((item, index) => (
                                    <View key={index}>
                                        {index === 1 && <RecommendFriends></RecommendFriends>}
                                        <Item item={item} key={index}></Item>
                                    </View>
                                ))}

                            </ScrollView>

                            <SocialFeed/>
                        </View>

                        <HomeScreenFooter/>
                    </SafeAreaView>
                </View>
            </View>
        )
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPosts: () => dispatch(FetchPostsRequest()),
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    gradientStyle: {
        width: 73,
        height: 73,
        borderRadius: 100,
        padding: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    postImage: {
        resizeMode: 'cover',
        width: 62,
        height: 62,
        borderRadius: 30,
        shadowOpacity: 0.3,
        shadowRadius: 20,
        borderColor: '#6C6A68',
    },

    postView: {
        borderRadius: 40,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
    },

    postCap: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 5,
        color: '#535353',
    },

    postProfLogoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    mainViewStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    safeAreaStyle: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },

    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
    },

    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: "center",
        lineHeight: 50,
    }
})