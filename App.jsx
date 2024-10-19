
import analytics from '@segment/analytics-react-native';
import * as Sentry from '@sentry/react-native';
import { get } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import PropTypes from 'prop-types';

import * as React from 'react';

import {
	AppRegistery,
	AppState,
	InteractionManager,
	Linking,
	LogBox,
	NativeModule,
	StatusBar,
	View
	} from 'react-native';

import {
	IS_TESTING,
	REACT_APP_SEGMENT_API_WRITE_KEY,
	SENTRY_ENDPOINT,
	SENTRY_ENVIRONMENT,
	} from 'react-native-dotenv';

import { Provider } from 'react-redux';
import { NavigatorContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './screens/Home';
import 'react-native-gesture-handler';

import Comments from './screens/Comments';
import CommentsPopup from './screens/CommentsPopup';
import PostDetail from './screens/PostDetail';
import SharePost from './screens/SharePost';
import PostOptions from './screens/PostOptions';
import { BASE_URI } from './src/api/constants';
import monitorNetwork from './src/debugging/networkDebugging';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();

if (__DEV__) {
	reactNativeDisableYellowBox && LogBox.ignoreAllLogs();
	(showNetworkRequests || showNetworkResponses) && monitorNetwork(showNetworkRequests, showNetworkResponses);
} else {
	async function initSentryAndCheckForFedoraMode() {
		let metadata;
		try {
			const config = await codePush.getCurrentPackage();
			if (!config || config.deploymentKey === CODE_PUSH_DEPLOYMENT_KEY) {
				codePush.sync({
					deploymentKey
				})
			}
		}
	}
}

const MainTab = () => {
	const navOpts = {
		style: { paddingTop: STATUSBAR_HEIGHT },
		showIcon: true,
		showLabel: false,
	}

	return (
		<Tab.Navigator>
			<Tab.Screen />
		</Tab.Navigator>
	)
}

function App() {
	const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
	const TabTransitionPreset = TransitionPresets.SlideFromRightIOS;
	const navigationOptions = {
		headerShown: false,
		...TransitionPreset,
		gestureResponseDistance: {
			vertical: 800,
		}
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<rootStack.Navigator screenOptions={navigationOptions}>

					<rootStack.Screen component={MainTab} name="MainTab" />
					<rootStack.Screen name="StoryDetail" component={StoryDetailScreen} />
					<rootStack.Screen name="PostDetail" component={PostDetail} />

					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="Marketplace" component={Marketplace} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="MarketplaceSearch" component={MarketplaceSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="MarketplaceProductDetail" component={MarketplaceProductDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="MarketplaceCategory" component={MarketplaceCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="MarketplaceArea" component={MarketplaceArea} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="Page" component={Page} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="PagePostDetail" component={PagePostDetail} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="PhotoChooser" component={PhotoChooser} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Camera" component={Camera} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Search" component={Search} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="Result" component={Result} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="WatchOptions" component={WatchOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="WatchSearch" component={WatchSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="SeenVideos" component={SeenVideos} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="WatchDetail" component={WatchDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="WatchDetailList" component={WatchDetailList} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="ProfilePostOptions" component={ProfilePostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="EditPublicInfo" component={EditPublicInfo} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="FullFriends" component={FullFriends} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="FriendOptions" component={FriendOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="FindFriends" component={FindFriends} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FriendRequests" component={FriendRequests} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="ProfileSetting" component={ProfileSetting} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="ProfileX" component={ProfileX} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="AvatarOptions" component={AvatarOptions} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="NotificationOptions" component={NotificationOptions} />

					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="GroupCategory" component={GroupCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="GroupCategories" component={GroupCategories} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="GroupSearch" component={GroupSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TabTransitionPreset }} name="GroupProfile" component={GroupProfile} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="CommentsPopUp" component={CommentsPopUp} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="SharePost" component={SharePost} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="PostOptions" component={PostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FullPostTool" component={FullPostTool} />
					<rootStack.Screen name="CheckIn" component={CheckIn} />
					<rootStack.Screen name="PhotoUploader" component={PhotoUploader} />
					<rootStack.Screen name="LiveStream" component={LiveStream} />

				</rootStack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
export default App;
