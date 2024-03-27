import {NavigationContainer} from "@react-navigation/native";
import AddToFeedPage from "./src/pages/AddToFeedPage";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedDisplayPage from "./src/pages/FeedDisplayPage";


const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FeedDisplay">
                <Stack.Screen name="FeedDisplay" component={FeedDisplayPage}/>
                <Stack.Screen name="AddToFeed" component={AddToFeedPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


