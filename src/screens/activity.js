import { ActivityIndicator, ScrollView } from "react-native";

class UsersScreen extends React.Component {
    constructor() {
        super();
        this.firestore_ref = firebase.firestore().collection('users');
        this.state = {
            isLoading: true,
            userArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestore_ref.onShapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const {name, email, mobile, desc} = res.data();
            userArr.push({
                key: res.uid,
                res,
                name,
                email,
                mobile,
                desc
            });
        });
        this.setState({
            userArr,
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                chevron
                                bottomDivider
                                title={item.name}
                                subtitle={item.email}
                                rigthTitle={item.desc}
                                onPress={() => {
                                    this.props.navigation.navigate('UserDetailsScreen', {
                                        userKey: item.key
                                    });
                                }}
                            />
                        );
                    })
                }
            </ScrollView>
        );
    }
}