import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCache } from 'apollo3-cache-persist';

const apiCache = new InMemoryCache();
const apiClient = new ApolloClient({
	uri: BASE_URI,
	apiCache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network'
		}
	},
});

function apiMain() {
    const [loadingCache, setLoadingCache] = React.useState(true);
    React.useEffect(() => {
		persistCache({
			apiCache,
			storage: AsyncStorage,
		}).then(() => setLoadingCache(false))
	}, []);
    if (loadingCache) {
		return <AppLoading />
	}
}