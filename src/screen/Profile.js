import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SPACING from "../../assets/config/SPACING"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default Profile = ({ navigation }) => {
  const [dataAPIs, setDataAPIs] = useState([])
  const [likeArray, setLikedArray] = useState([])

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getLiked()
    })
    return focusHandler
  }, [])

  const getAPIs = () => {
    API.defaults.headers.common["Authorization"] = "Bearer Wookie2019"
    API.get("movies")
      .then((res) => {
        res.data.movies.forEach((item) => {
          if (item.id === route.params.id) {
            setData(item)
            setRating(item.imdb_rating)
            setYearReleased(
              item.released_on.slice(0, item.released_on.indexOf("-"))
            )
            setCast(item.cast)
            setDirector(item.director)
          }
        })
        setDataAPIs(res.data.movies)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getLiked = async () => {
    try {
      const value = await AsyncStorage.getItem("Liked")
      if (value == null) {
        setLikedArray([])
      }
      if (value != null) {
        const myArray = value.split(" ")
        setLikedArray(myArray)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {console.log(likeArray)}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
          <Ionicons name="ellipsis-vertical" size={24} color="#52575D" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../assets/image/avatar.png")}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.dm}>
            <MaterialCommunityIcons name="chat" size={18} color="#DFD8C8" />
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={30}
              color="#DFD8C8"
              style={{ marginTop: 3, marginLeft: 2 }}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "300", fontSize: 36 }]}>
            Toàn Thắng
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Software Engineering
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../../assets/image/media1.jpeg")}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../../assets/image/media2.jpeg")}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View
              style={[styles.mediaImageContainer, { marginRight: SPACING * 2 }]}
            >
              <Image
                source={require("../../assets/image/media3.jpeg")}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.favoriteMoviesContainer}>
          <Text style={[styles.favoriteMoviesText]}>Favorite Movies</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: SPACING * 2,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
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
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginLeft: SPACING * 2,
  },
  favoriteMoviesContainer: {
    marginHorizontal: SPACING * 2,
    marginTop: SPACING * 2,
  },
  favoriteMoviesText: {
    fontSize: SPACING * 2.5,
    fontWeight: "bold",
  },
})
