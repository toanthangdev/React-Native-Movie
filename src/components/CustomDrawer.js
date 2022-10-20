import { StyleSheet, View } from "react-native"
import React, { useState, useEffect } from "react"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Avatar, Title, Switch, RadioButton } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default CustomDrawer = (props) => {
  const [name, setName] = useState("User")
  const [value, setValue] = useState("en")
  const [isDarkTheme, setIsDarkTheme] = useState(null)

  const getAsyncData = async () => {
    try {
      const isDarkTheme = await AsyncStorage.getItem("isDarkTheme")
      if (isDarkTheme == null) {
        setIsDarkTheme(false)
      } else {
        setIsDarkTheme(isDarkTheme === "true" ? true : false)
      }
      const name = await AsyncStorage.getItem("Name")
      if (name == null) {
        setName("User")
      }
      if (name != null) {
        setName(name)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem(
        "isDarkTheme",
        isDarkTheme === true ? "false" : "true"
      )
      setIsDarkTheme(!isDarkTheme)
      props.parentCallback(!isDarkTheme)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAsyncData()
  }, [isDarkTheme])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            source={require("../../assets/image/avatar.png")}
            size={70}
          />
          <Title style={styles.nameTitle}>{name}</Title>
        </View>
        <View style={{ paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
        <View style={styles.darkThemeContainer}>
          <Title style={{ fontSize: 16 }}>Dark Theme</Title>
          <View style={{ marginLeft: 20 }}>
            <Switch
              value={isDarkTheme}
              color="#05307e"
              onValueChange={toggleTheme}
            />
          </View>
        </View>
        <View style={styles.changeLanguageContainer}>
          <Title style={{ fontSize: 16, marginRight: 30 }}>Language</Title>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={{ flexDirection: "row" }}>
              <Title style={{ fontSize: 14, marginRight: 10 }}>English</Title>
              <RadioButton value="en" />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Title style={{ fontSize: 14, marginRight: 10 }}>
                Vietnamese
              </Title>
              <RadioButton value="vn" />
            </View>
          </RadioButton.Group>
        </View>
      </DrawerContentScrollView>
      <View style={styles.footerContainer}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  nameTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  darkThemeContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  changeLanguageContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  footerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
})
