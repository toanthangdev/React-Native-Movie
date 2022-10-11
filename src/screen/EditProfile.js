import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  //TextInput,
} from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import SPACING from "../../assets/config/SPACING"
import { TextInput, Button } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default EditProfile = ({ navigation }) => {
  const [name, setName] = useState("User")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem("Name")
      if (name == null) {
        setName("User")
      }
      if (name != null) {
        setName(name)
      }
      const email = await AsyncStorage.getItem("Email")
      if (email == null) {
        setEmail("")
      }
      if (email != null) {
        setEmail(email)
      }
      const phone = await AsyncStorage.getItem("Phone")
      if (phone == null) {
        setPhone("")
      }
      if (phone != null) {
        setPhone(phone)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onUpdate = async () => {
    try {
      if (name != "User") {
        await AsyncStorage.setItem("Name", name)
      } else {
        await AsyncStorage.setItem("Name", "User")
      }
      if (email != "") {
        await AsyncStorage.setItem("Email", email)
      } else {
        await AsyncStorage.setItem("Email", null)
      }
      if (phone != "") {
        await AsyncStorage.setItem("Phone", phone)
      } else {
        await AsyncStorage.setItem("Phone", null)
      }
      navigation.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {console.log(name)}
      {console.log(email)}
      {console.log(phone)}
      <ScrollView
        style={{ paddingHorizontal: SPACING * 2, paddingVertical: SPACING }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 100,
            overflow: "hidden",
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../../assets/image/avatar.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={{ marginVertical: SPACING * 2 }}>
          <View style={{ marginBottom: SPACING * 2 }}>
            <Text>NAME</Text>
            <TextInput
              mode="outlined"
              placeholder={name}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ marginBottom: SPACING * 2 }}>
            <Text>EMAIL</Text>
            <TextInput
              multiline
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              placeholder={email == "" ? "Email..." : email}
            />
          </View>
          <View style={{ marginBottom: SPACING * 2 }}>
            <Text>PHONE</Text>
            <TextInput
              mode="outlined"
              onChangeText={(text) => setPhone(text)}
              placeholder={phone == "" ? "Phone..." : phone}
            />
          </View>
        </View>
        <Button mode="contained" color="blue" onPress={onUpdate}>
          Update
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
