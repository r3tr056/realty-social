import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { navigation } from '../../../rootNavigation';
import { SCREEN_WIDTH } from '../../constants';

class People extends React.Component {
    constructor(props) {
        super(props);
    }

    onPressViewProfileHandler(userId: any) {
        navigation.navigate('ProfileX', {userId});
    }

    render() {
        const { hidden, isShowPerview, showAllFn} = this.props;
        let users = [...this.props.user]
        if (isShowPerview) users = users.splice(0, 10);
        
        return (
            <View>
                <Text>People</Text>
                {users.map((people, index) => (
                    <ExTouchableOpacity>
                        <Image/>
                        <View>
                            <Text>{people.name}</Text>
                            <Text>Live in {people.live_in}</Text>
                        </View>
                        <ExTouchableOpacity>
                            <FontAwesome5Icon name="user-plus" color="#333" size={20}/>
                        </ExTouchableOpacity>
                    </ExTouchableOpacity>
                ))}
                {isShowPerview &&
                <TouchableOpacity style={styles.btnShowAll} 
                onPress={showAllFn}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                        Show All
                    </Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}

const mapstateToProps = state => {
    return {
        users: state.searchResult.users
    }
}

export default connect(mapstateToProps, null)(People)
const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        padding: 15,
        paddingVertical: 10,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 10
    },
    peopleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd'
    },
    peopleAvatar: {
        width: 64,
        height: 64,
        borderRadius: 64
    },
    peopleInfo: {
        width: SCREEN_WIDTH - 20 - 30 - 64 - 30,
        paddingHorizontal: 10,
    },
    peopleName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    peopleoLiveIn: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnAddFriend: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnShowAll: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 5
    }
})