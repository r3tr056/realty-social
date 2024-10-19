import { StyleSheet, TouchableOpacity } from "react-native";

export default function Footer({props}) {
    return (
        <View style={styles.footerView}>
            {this.footerIcons.map((img, key) => {
                return (
                    <TouchableOpacity key={key}>
                        <Image source={img} style={styles.footerIcon}/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    footerIcon: {
        resizeMode: 'contain',
        width: 30,
        top: 10,
    },

    footerView: {
        height: 65,
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: 'space-between',
    }
})