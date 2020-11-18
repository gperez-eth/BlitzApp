import React from 'react';
import { createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Register } from '../Screens'

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator headerMode="screen" screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <AuthStack.Screen name="Login" component={Login}
        options={({navigation}) => ({
          headerTitleStyle: { fontSize: 30, fontFamily: 'Bold' },
          headerShown: false
        })}
      />
      <AuthStack.Screen name="Register" component={Register} 
        options={({ navigation, route }) => ({
          headerTitleStyle: { fontSize: 25, fontFamily: 'Bold' },
          headerShown: false
        })}
      />
    </AuthStack.Navigator>
  );
}

export default function Router() {
    return (
        <AuthStackScreen />
    );
  }