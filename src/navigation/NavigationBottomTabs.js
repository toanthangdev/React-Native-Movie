import React from 'react'
import HomeStack from './navigationStack/HomeStack'
import Search from '../screen/Search'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

const NavigationBottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'HomeStack') {
                        iconName = 'home'
                    } else {
                        iconName = 'search'
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />
                }
            })}>
                <Tab.Screen options={{ tabBarLabel: 'Home' }} name='HomeStack' component={HomeStack} />
                <Tab.Screen name='Search' component={Search} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default NavigationBottomTabs