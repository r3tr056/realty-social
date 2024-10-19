import React, {useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {firebase} from '../../fbase/config';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value:'', error: ''});

    const OnFooterLinkPress = () => {
        navigation.navigate('Registration');
    }

    const OnLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDoc => {
                        if (!firestoreDoc.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDoc.data()
                        navigation.navigate('Home', {user: user})
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always"
            >
                <Logo/>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value = {email}
                    underlineColorAndroid="transparent"
                    autoCapatalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value = {password}
                    underlineColorAndroid="transparent"
                    autoCapatalize="none"
                />
                <Button style={styles.button}
                    onPress={() => OnLoginPress()}
                >
                    <Text style={stylex.buttonTitle}>Log In</Text>
                </Button>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account?
                        <Text onPress={OnFooterLinkPress()} style={styles.footerLink}>Sign up</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    title: {},

    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alighSelf: "center",
        margin: 30
    },

    input: {
        height: 48
    }
})