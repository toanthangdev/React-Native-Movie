import React from 'react'
import Home from '../../screen/Home'
import Detail from '../../screen/Detail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    )
}

export default HomeStack