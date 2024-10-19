import React from 'react';
import { StyleSheet, Text, Image, View, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../constants';
import ScaledImage from '../ScaledImage';

/*
* A Realty SocialItem Component
*/
class SocialItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onPressHandle() {
        const { comments } = this.props.item;
        navigation.navigate('Comments', {
            comments
        });
    }

    onPressSocialItemOptionsIconHandler() {
        const { item } = this.props;
        navigation.navigate('SocialItemOptions', {
            SocialItemDetail: item
        });
    }

    onPressSocialItemImageHandler(id) {
        navigation.navigate('SocialItemDetail', {id});
    }

    onPressShareHandler() {
        const { item } = this.props;
        navigation.navigate('ShareSocialItem', {id: item.id});
    }

    onPressProfileHandler(userId) {
        const { user } = this.props;
        if (userId === user.id) {
            return navigation.navigate('Profile')
        }
        navigation.push('ProfileX', {userId});
    }
    
    render() {
        const { user, content } = this.props;
        return (
            <View style={styles.socialItem}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <View style={styles.customListView}>
                        <Image style={styles.avatar} source={{uri: socialItem.user?.avatar_url}} />
                        <View style={styles.infoWrapper}>
                            <View style={styles.namesWrapper}>
                                <TouchableOpacity>
                                    <Text>{user?.name}</Text>
                                </TouchableOpacity>
                            </View>
                            <View styles={styles.extraInfoWrapper}>
                                <Text style={{color: '#333', fontSize: 14 }}>{socialItem.create_at}</Text>
                                <Text style={{fontSize: 16, marginHorizontal: 5}}>.</Text>
                                {socialItem.permission == SocialItemPerms.permissions.PUBLIC && (
                                    <FontAwesome5Ico color='#333' name="globe-asia"/>
                                )}
                                {socialItem.permission == SocialItemPerms.permissions.SETTING && (
                                    <FontAwesome5Ico color='#333' name="cogs"/>
                                )}
                                {socialItem.permission == SocialItemPerms.permissions.GROUP && (
                                    <FontAwesome5Ico color='#333' name="newspaper"/>
                                )}
                            </View>
                        </View>
                    </View>
                    
                    
                    <TouchableOpacity onPress={this.onPressSocialItemOptionsIconHandler.bind(this)} style={{width: 25, alignItems: 'center'}}>
                        <Icon name="ellipsis-h" color='#000'></Icon>
                    </TouchableOpacity>
    
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.paragraph}>{socialItem.content}</Text>
                </View>

                { /** Post Image */}
                <TouchableOpacity onPress={this.onPressSocialItemImageHandler.bind(this, item.id)}>
                    <View style={styles.imageContainer}>
                        <ScaledImage height={300} source={socialItem.image}></ScaledImage>
                    </View>
                </TouchableOpacity>

                <View>
                     
                    { /** thumbs up button */}
                    <TouchableOpacity><Icon name="thumbs-up"
                        color="#318bfb"
                        backgroundColor="#fff"></Icon>
                    </TouchableOpacity>
                    
                    { /** Reactions */}
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={{uri: socialItem.comment.users.user1reaction }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={{uri: socialItem.comment.users.user2reaction }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={{uri: socialItem.comment.users.user3reaction}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={{uri: socialItem.comment.users.user4reaction }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={{uri: socialItem.comment.users.user5reaction }}/>
                    </TouchableOpacity>
                    
                    { /** Comments */}
                    <TouchableOpacity onPress={this.onPressHandle.bind(this)}>
                        <Icon lineBreakMode={false}
                            name="comment-alt"
                            color="gray"
                            backgroundColor="white"
                            style={{...styles.reactionIcon, fontSize: 14}}>
                                <Text> comments</Text>
                        </Icon>
                    </TouchableOpacity>
                    
                    { /** Shares */}
                    <TouchableOpacity onPress={this.onPressShareHandler.bind(this)}>
                        <Icon name="share-alt" color="gray">
                            <Text style={{fontSize: 12, textAlignVertical: 'center'}}> Share</Text>
                        </Icon>
                    </TouchableOpacity>
                </View>

                <View style={styles.commentContainer }>
                    <Image source={{uri: user.avatar_url }} style={ styles.commentAvatar }></Image>
                    <View style={styles.commentInput}>
                        <TouchableOpacity onPress={this.onPressHandle.bind(this)} style={styles.commentInputWrapper}>
                            <Text>Comment...</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity><Icon style={styles.btnSendComment} name="paper-plane" color="gray"></Icon></TouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, null)(SocialItem)
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    customListView: {
        padding: 15,
        width: SCREEN_WIDTH - 40,
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    infoWrapper: {
        marginLeft: 8
    },
    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { height: 0, width: 0 },
        marginBottom: 10
    },
    commentInputWrapper: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    paragraph: {},
    contentContainer: {
        paddingHorizontal: 15
    },
    imageContainer: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reactionContainer: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    reactionIcon: {
        fontSize: 20,
        padding: 10
    },
    shareIcon: {
        position: 'absolute',
        fontSize: 14,
        padding: 10,
        right: 0
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
        borderColor: "red",
        borderStyle: 'dashed',
        flexWrap: 'nowrap'
    },
    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    commentInput: {
        borderRadius: 0.5,
        borderColor: 'gray',
        borderRadius: 20,
        marginLeft: 10,
        height: 30,
        width: SCREEN_WIDTH - 15 * 2 - 60,
    },
    btnSendComment: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30
    }
});
