import React from "react";
import { Alert, View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';

import TodayStatus from './TodayStatus';
import TodayStatusAdder from './TodayStatusAdder';
import { FetchStatusRequest } from '../../actions/statusAction';

class index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchStatuses } = this.props;
        fetchStatuses();
    }

    render() {
        const { stories, user, navigation } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.todayStatuses} horizontal={true}>

                    <TodayStatusAdder user={user} />
                    {stories.map((status, index) => (
                        <TodayStatus position={index} key={index} status={status}/>
                    ))}

                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchStatuses: () => dispatch(FetchStatusRequest())
    }
}

const mapStateToProps = (state) => {
    return {
        statuses: state.statuses,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(index)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#ffffff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 10,
    },

    todayStatuses: {
        flexWrap: 'nowrap',
    }
})