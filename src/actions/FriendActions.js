import { friendActions } from '../constants';
import axios from 'axios';

const taskURI = '/recommended_friends?_expand=user'
const FRIENDS_QUERY = gql`
    query Friends($id: Int!) {
        
    }
`

export const FetchRecommendedFriendRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data;
            dispatch(FetchRecommendedFriendRequest(friends));
        }).catch(error => {
            dispatch(FetchRecommendedFriendRequest(error));
        })
    }
}

const FetchDefaultState = () => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_REQUEST,
    }
}

export const FetchRecommendedFriendsFailure = (error) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_FAILURE,
    }
}

export const FetchREcommentedFriendsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_SUCCESS,
        payload: friends
    }
}

export const FetchFriendRequestsRequests = () => {
    const taskURI = '/friend_requests?_expand=user'
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data;
            dispatch(FetchFriendRequestsSuccess(friends));
        }).catch(error => {
            dispatch(FetchFriendRequestsFailure(error));
        })
    }
}

export const FetchFriendRequestsFailure = (error) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_FAILURE,
        error,
    }
}

export const FetchFriendRequestsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_SUCCESS,
        payload: friends
    }
}