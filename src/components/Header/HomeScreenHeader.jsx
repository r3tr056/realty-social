import { StyleSheet } from "react-native";

export default function HomeScreenHeader({props}) {
    return (
        <View style={styles.homeHeader}>
            <View style={styles.subHomeHeader}>
                <Image source={require('../../assets/icons/post.png')}
                    style={{resizeMode: 'contain', height: 26, top: 6}}
                />
                <Image source={require('../../assets/icons/rlty-logo.png')}
                    style={{width: 110, height: 40, position: 'absolute', left: '50%', transform: [{translateX: -50}]}}
                />
                
                <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../assets/icons/communicator.png')} style={{resizeMode: 'contain', height: 31, top: 5}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeHeader: {
        height: 55,
        backgroundColor: '#F9F9F9', 
        flexDirection: 'row', 
        paddingHorizontal: 5, 
        paddingVertical: 15, 
        elevation: 2,
    },

    subHomeHeader: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        top: -8 
    }
})