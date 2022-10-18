import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Profile from "../screen/Profile"
import NavigationBottomTabs from "./NavigationBottomTabs"
import { NavigationContainer } from "@react-navigation/native"
import CustomDrawer from "../components/CustomDrawer"
import Ionicons from "react-native-vector-icons/Ionicons"

const Drawer = createDrawerNavigator()

export default NavigationDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: '#05307e',
          drawerActiveTintColor: '#FFF',
          headerShown: false,
          drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={NavigationBottomTabs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
