import { UserController } from '@/controllers';
import { strings } from '@/localization';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

export const LoginRequest = (username, password) => {
    const taskURI = `/users?username=${username}&password=${password}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const users = v.data
            if (users.length > 0) {
                let user = users[0];
                dispatch(FetchHighLightPhotosRequest(user.id))
                dispatch(FetchFriendRequest(user.id));
                dispatch(FetchProfilePostsRequests(user.id));
                const watch_list = user.watch_list.slice(0, 3).map(page => page.pageId);
                const watchlistQuery = watch_list.join("&id=");
                let taskURI2 = `/pages?id=&{watchListQuery}`;
                axios.get(taskURI2).then(result => {
                    const pages = result.data;
                    user.watch_list = pages;
                    dispatch(LoginSuccess(user));
                }).catch (error => {
                    dispatch(LoginFailure(error))
                })
            }
        })
    }
}

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const login = (username, password) => async (dispatch, _, { demoMode, networkService }) => {
  try {
    dispatch(loginRequest());
    const userController = new UserController(networkService);
    const { data } = await userController.login({ username, password, demoMode });
    if (!demoMode) {
      networkService.setAccessToken(data.user.accessToken);
    }
    dispatch(loginSuccess(data.user));
  } catch ({ data }) {
    dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
  }
};

export const logout = () => async (dispatch, _, { demoMode, networkService }) => {
  try {
    const userController = new UserController(networkService);
    await userController.logout({ demoMode });
  } finally {
    networkService.clearAccessToken();
    dispatch(clearStore());
  }
};