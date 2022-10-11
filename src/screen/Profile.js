import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import SPACING from "../../assets/config/SPACING"
import AsyncStorage from "@react-native-async-storage/async-storage"
//import API from "../../assets/config/APIs"
import { getMovies } from "../redux/movieSlice"
import { useDispatch, useSelector } from "react-redux"

export default Profile = ({ navigation }) => {
  //const [dataAPIs, setDataAPIs] = useState([])
  const [likeArray, setLikedArray] = useState([])
  //const [data, setData] = useState([])

  const dispatch = useDispatch()

  const moviesData = useSelector((state) => state.movie.moviesData)

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      //getAPIs()
      dispatch(getMovies())
      getLiked()
    })
    return focusHandler
  }, [navigation])

  // const getAPIs = () => {
  //   API.defaults.headers.common["Authorization"] = "Bearer Wookie2019"
  //   API.get("movies")
  //     .then((res) => {
  //       setDataAPIs(res.data.movies)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

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

  if (!moviesData) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
          </TouchableOpacity>
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
            <Text style={[styles.text, { fontSize: 24 }]}>
              {likeArray.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>
              {likeArray.length == 1 ? "Movie" : "Movies"}
            </Text>
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
            <Text style={[styles.text, { fontSize: 24 }]}>1000</Text>
            <Text style={[styles.text, styles.subText]}>Follower</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>10000</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {moviesData.map((movie) =>
              likeArray.map((like, index) =>
                movie.id == like ? (
                  <View key={index} style={styles.mediaImageContainer}>
                    <Image
                      source={{ uri: movie.backdrop }}
                      resizeMode="cover"
                      style={styles.image}
                    />
                  </View>
                ) : null
              )
            )}
          </ScrollView>
        </View>
        <View style={styles.favoriteMoviesContainer}>
          <Text style={[styles.favoriteMoviesText]}>Favorite Movies</Text>
        </View>
        {moviesData.map((movie) =>
          likeArray.map((like, index) =>
            movie.id == like ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { id: movie.id })}
                key={index}
                style={styles.movieBody}
              >
                <ImageBackground
                  style={styles.backgroundMovie}
                  source={{
                    uri: movie.backdrop,
                  }}
                >
                  <View style={styles.movieData}>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{
                        uri: movie.poster,
                      }}
                    />
                  </View>
                  <View style={styles.movieText}>
                    <Text style={styles.textTitle}>{movie.title}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <AntDesign
                        name="calendar"
                        size={SPACING * 1.5}
                        color="#FFF"
                      />
                      <Text style={styles.textRelease}>
                        {" " +
                          movie.released_on.slice(
                            0,
                            movie.released_on.indexOf("T")
                          ) +
                          " | "}
                      </Text>
                      <AntDesign
                        name="clockcircleo"
                        size={SPACING * 1.5}
                        color="#FFF"
                      />
                      <Text style={styles.textRelease}>
                        {" " + movie.length}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ) : null
          )
        )}
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
    margin: SPACING * 2,
  },
  favoriteMoviesText: {
    fontSize: SPACING * 2.5,
    fontWeight: "bold",
  },
  movieBody: {
    marginHorizontal: SPACING * 2,
    borderRadius: SPACING,
    overflow: "hidden",
    marginBottom: SPACING * 2,
  },
  backgroundMovie: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  movieData: {
    width: "30%",
    height: "90%",
    marginHorizontal: SPACING,
    borderRadius: SPACING * 2,
    overflow: "hidden",
  },
  movieText: {
    width: "60%",
    height: "90%",
    justifyContent: "space-evenly",
  },
  textTitle: {
    color: "#FFFFFF",
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },
  textRelease: {
    fontSize: SPACING,
    color: "#FFF",
    fontWeight: "600",
  },
})
