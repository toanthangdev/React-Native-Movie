import React from "react"
import HomeStack from "./navigationStack/HomeStack"
import SearchStack from "./navigationStack/SearchStack"
import ProfileStack from "./navigationStack/ProfileStack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { TextBase } from "react-native"

const Tab = createBottomTabNavigator()

const NavigationBottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "HomeStack") {
              iconName = "home"
            } else if (route.name === "SearchStack") {
              iconName = "search"
            } else if (route.name === "ProfileStack") {
              iconName = "user"
            }
            return <FontAwesome name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen
          options={{ tabBarLabel: "Home" }}
          name="HomeStack"
          component={HomeStack}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Search" }}
          name="SearchStack"
          component={SearchStack}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Profile" }}
          name="ProfileStack"
          component={ProfileStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBottomTabs
