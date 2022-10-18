import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Ionicons from "react-native-vector-icons/Ionicons"

export default CustomDrawer = (props) => {
  const [name, setName] = useState("User")

  useEffect(() => {
    getLiked()
  }, [])

  const getLiked = async () => {
    try {
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

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#FFF" }}
      >
        <ImageBackground
          source={require("../../assets/image/bg.jpeg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../assets/image/avatar.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600" }}>
            {name}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#CCC" }}>
        <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
