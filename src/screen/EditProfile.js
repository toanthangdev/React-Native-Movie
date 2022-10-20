import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import SPACING from "../../assets/config/SPACING"
import { TextInput, Button } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text as TextPaper, Modal as ModalPaper} from 'react-native-paper'
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import Modal from "react-native-modal"
import ImagePicker from "react-native-image-crop-picker"

export default EditProfile = ({ navigation }) => {
  const [name, setName] = useState("User")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  // const [image, setImage] = useState('');

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

  const requestCameraPermission = async () => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          { title: "Camera Permission", message: "App needs camera permission" }
        )
        return granted == PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    } else return true
  }

  const requestExternalWritePermission = async () => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        )
        return granted == PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        alert("Write permission err", err)
      }
    } else return true
  }

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30,
      savaToPhotos: true,
    }
    let isCameraPermitted = await requestCameraPermission()
    let isStoragePermitted = await requestExternalWritePermission()
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (res) => {
        if (res.didCancel) {
          console.log("User cancelled camera picker")
          return
        } else if (res.errorCode == "camera_unavailable") {
          alert("Camera not available on device")
          return
        } else if (res.errorCode == "permission") {
          alert("Permission not satisfied")
          return
        } else if (res.errorCode == "others") {
          alert(res.errorMessage)
          return
        }
        setFilePath(res)
      })
    }
  }

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    }
    launchImageLibrary(options, (res) => {
      setFilePath(res)
    })
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then((image) => {
      console.log(image)
    })
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then((image) => {
        console.log(image)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        isVisible={modalVisible}
        style={{
          //backgroundColor: "white",
          margin: 0,
        }}
      >
        <View
          style={{
            height: 250,
            backgroundColor: "white",
            bottom: 0,
            position: "absolute",
            width: "100%",
            borderTopLeftRadius: SPACING * 2,
            borderTopRightRadius: SPACING * 2,
            padding: SPACING * 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginBottom: SPACING / 4,
              fontSize: SPACING * 2.5,
              fontWeight: "bold",
            }}
          >
            Upload Photo
          </Text>
          <Text style={{ marginBottom: SPACING }}>
            Choose Your Profile Picture
          </Text>
          <Button
            style={{ width: "100%", marginBottom: SPACING }}
            mode="contained"
            color="blue"
            onPress={() => captureImage("picture")}
          >
            Take photo
          </Button>
          <Button
            style={{ width: "100%", marginBottom: SPACING }}
            mode="contained"
            color="blue"
            // onPress={() => chooseFile('picture')}
            onPress={() => choosePhotoFromLibrary()}
          >
            Choose from library
          </Button>
          <Button
            style={{ width: "100%" }}
            mode="contained"
            color="blue"
            onPress={() => setModalVisible(!modalVisible)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
      <ScrollView
        style={{ paddingHorizontal: SPACING * 2, paddingVertical: SPACING }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
        </TouchableOpacity>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/image/avatar.png")}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={styles.add}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Ionicons
              name="ios-add"
              size={30}
              color="#DFD8C8"
              style={{ marginTop: 3, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: SPACING * 8 }}>
          <View style={{ marginBottom: SPACING * 2 }}>
            <TextPaper style={styles.text}>NAME</TextPaper>
            <TextInput
              mode="outlined"
              placeholder={name}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ marginBottom: SPACING * 2 }}>
            <TextPaper style={styles.text}>EMAIL</TextPaper>
            <TextInput
              multiline
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              placeholder={email == "" ? "Email..." : email}
            />
          </View>
          <View style={{ marginBottom: SPACING * 2 }}>
            <TextPaper style={styles.text}>PHONE</TextPaper>
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
  imageContainer: {
    borderRadius: 100,
    overflow: "hidden",
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  text: {
    fontSize: SPACING * 1.5,
    fontWeight: "bold",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: SPACING * 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
})
