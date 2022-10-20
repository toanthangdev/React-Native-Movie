import React, { useState, useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Profile from "../screen/Profile"
import NavigationBottomTabs from "./NavigationBottomTabs"
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native"
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper"
import CustomDrawer from "../components/CustomDrawer"
import Ionicons from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Drawer = createDrawerNavigator()

export default NavigationDrawer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(null)

  const getAsyncData = async () => {
    try {
      const isDarkTheme = await AsyncStorage.getItem("isDarkTheme")
      if (isDarkTheme == null) {
        setIsDarkTheme(false)
      } else {
        setIsDarkTheme(isDarkTheme === "true" ? true : false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAsyncData()
  },[])

  const callbackFunction = (childData) => {
    setIsDarkTheme(childData)
  }

  return (
    <PaperProvider theme={isDarkTheme ? PaperDarkTheme : PaperDefaultTheme}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveBackgroundColor: "#05307e",
            drawerActiveTintColor: "#FFF",
            headerShown: false,
            drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
          }}
          drawerContent={(props) => (
            <CustomDrawer {...props} parentCallback={callbackFunction} />
          )}
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
    </PaperProvider>
  )
}
