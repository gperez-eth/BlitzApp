import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Home, Explore, ExploreCategory, Upload, UploadingTransition, ViewTutorial, Profile, OnBoarding, Likes } from '../Screens'

const HomeStack = createStackNavigator();
  
function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode={'float'} >
      <HomeStack.Screen name="Home" component={Home}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerTitle: 'Inicio',
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
      <ExploreStack.Screen name="ViewTutorial" component={ViewTutorial} 
        options={({ navigation }) => ({
          gestureDirection: "horizontal",
          headerShown: false
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
      <UploadStack.Screen name="UploadingTransition" component={UploadingTransition}
        options={({navigation}) => ({
          headerShown: false
        })}
      />
    </UploadStack.Navigator>
  );
}

const LikesStack = createStackNavigator();
  
function LikesStackScreen() {
  return (
    <LikesStack.Navigator headerMode={'screen'} >
      <LikesStack.Screen name="Likes" component={Likes}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerTitle: 'Likes'
        })}
      />
    </LikesStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
  
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode={'screen'}>
      <ProfileStack.Screen name="Perfil" component={Profile}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerShown: false
        })}
      />
    </ProfileStack.Navigator>
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
      <Tab.Screen name="Likes" component={LikesStackScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-heart'} color={color} size={30} />
        ),
      }}/>
      <Tab.Screen name="Profile " component={ProfileStackScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'ios-contact'} color={color} size={30} />
        ),
      }}/>
    </Tab.Navigator>
  )
}

const rootStack = createStackNavigator();

function RootStackNavigator() {
  return (
    <rootStack.Navigator headerMode={'screen'} initialRouteName="RootTab">
      <rootStack.Screen name="RootTab" component={BottomTabNavigator}
        options={({navigation}) => ({
          headerShown: false
        })}
      />
      <rootStack.Screen name="Onboarding" component={OnBoarding}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerShown: false
        })}
      />
    </rootStack.Navigator>
  )
}

export default function Router() {
    return (
        <RootStackNavigator />
    );
  }