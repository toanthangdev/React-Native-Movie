import React from 'react'
import Profile from '../../screen/Profile'
import Detail from '../../screen/Detail'
import EditProfile from '../../screen/EditProfile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Detail' component={Detail} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
        </Stack.Navigator>
    )
}

export default ProfileStack