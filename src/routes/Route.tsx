import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Home, Explore, ExploreCategory, Upload } from '../Screens'
import { LoadAssets } from '../Components'

const fonts = {
  "Bold": require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
  "Semibold": require("../../assets/fonts/SF-Pro-Text-Semibold.otf"),
  "Regular": require("../../assets/fonts/SF-Pro-Text-Regular.otf"),
};

const HomeStack = createStackNavigator();
  
function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode={'float'} >
      <HomeStack.Screen name="Home" component={Home}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerTitle: 'Inicio'
        })}
      />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator headerMode="screen" screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <ExploreStack.Screen name="Explore" component={Explore}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerTitle: 'Explorar'
        })}
      />
      <ExploreStack.Screen name="ExploreCategory" component={ExploreCategory} 
        options={({ navigation, route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontSize: 25, fontFamily: 'Bold' },
          gestureDirection: "horizontal",
        })}
      />
    </ExploreStack.Navigator>
  );
}

const UploadStack = createStackNavigator();
  
function UploadStackScreen() {
  return (
    <UploadStack.Navigator headerMode={'screen'} >
      <UploadStack.Screen name="Upload" component={Upload}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerTitle: 'Publicar'
        })}
      />
    </UploadStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
          showLabel: false,
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          style:{paddingBottom: 3, height:50},
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-home'} color={color} size={30} />
        ),
      }}/>
      <Tab.Screen name="Explore" component={ExploreStackScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-search'} color={color} size={30} />
        ),
      }}/>
      <Tab.Screen name="Upload" component={UploadStackScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-cloud-upload'} color={color} size={30} />
        ),
      }}/>
      <Tab.Screen name="Archived" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'md-bookmark'} color={color} size={30} />
        ),
      }}/>
      <Tab.Screen name="Profile " component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-contact'} color={color} size={30} />
        ),
      }}/>
    </Tab.Navigator>
  )
}

export default function Router() {
    return (
      <LoadAssets {...{ fonts }}>
        <BottomTabNavigator />
      </LoadAssets>
    );
  }