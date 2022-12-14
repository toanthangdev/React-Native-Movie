import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import SPACING from "../../assets/config/SPACING"
import { AirbnbRating } from "react-native-ratings"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch, useSelector } from "react-redux"
import { getMovies } from "../redux/movieSlice"
import {Text as TextPaper} from 'react-native-paper'

const Detail = ({ route }) => {
  //const [dataAPIs, setDataAPIs] = useState([])
  //const [data, setData] = useState([])
  //const [cast, setCast] = useState([])
  //const [director, setDirector] = useState([])
  //const [rating, setRating] = useState(null)
  const [liked, setLiked] = useState("")
  //const [yearReleased, setYearReleased] = useState("")
  const [likedArray, setLikedArray] = useState([])

  const dispatch = useDispatch()

  const moviesData = useSelector((state) => state.movie.moviesData)

  const data = moviesData.filter((item) => item.id == route.params.id)[0]

  useEffect(() => {
    //getAPIs()
    dispatch(getMovies)
    getLiked()
  }, [liked])

  const onLike = async (value) => {
    try {
      if (!liked.includes(value)) {
        if (liked == "") {
          setLiked(value)
          await AsyncStorage.setItem("Liked", value)
        } else {
          setLiked(liked + " " + value)
          await AsyncStorage.setItem("Liked", liked + " " + value)
        }
      } else {
        if (liked == value) {
          setLiked(liked.replace(value, ""))
          await AsyncStorage.setItem("Liked", liked.replace(value, ""))
        } else if (liked.includes(value + " ")) {
          setLiked(liked.replace(value + " ", ""))
          await AsyncStorage.setItem("Liked", liked.replace(value + " ", ""))
        } else {
          setLiked(liked.replace(" " + value, ""))
          await AsyncStorage.setItem("Liked", liked.replace(" " + value, ""))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLiked = async () => {
    try {
      const value = await AsyncStorage.getItem("Liked")
      if (value == null) {
        setLiked("")
        setLikedArray([])
      }
      if (value != null) {
        setLiked(value)
        const myArray = liked.split(" ")
        setLikedArray(myArray)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // const getAPIs = () => {
  //   API.defaults.headers.common["Authorization"] = "Bearer Wookie2019"
  //   API.get("movies")
  //     .then((res) => {
  //       res.data.movies.forEach((item) => {
  //         if (item.id === route.params.id) {
  //           setData(item)
  //           setRating(item.imdb_rating)
  //           setYearReleased(
  //             item.released_on.slice(0, item.released_on.indexOf("-"))
  //           )
  //           setCast(item.cast)
  //           setDirector(item.director)
  //         }
  //       })
  //       setDataAPIs(res.data.movies)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  if (!data) {
    return null
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={{ uri: data.backdrop }}
      >
        <View style={styles.headerData}>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.poster} source={{ uri: data.poster }} />
            <View style={styles.headerText}>
              <TextPaper style={styles.title}>{data.title}</TextPaper>
              <View>
                <TouchableOpacity onPress={() => onLike(data.id)}>
                  <FontAwesome
                    name={
                      likedArray.includes(route.params.id) ? "heart" : "heart-o"
                    }
                    size={SPACING * 2}
                    color="red"
                  />
                </TouchableOpacity>
                <AirbnbRating
                  count={10}
                  defaultRating={data.imdb_rating}
                  size={SPACING * 1.3}
                  isDisabled={true}
                  reviews={[]}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: SPACING * 2,
              flexWrap: "wrap",
            }}
          >
            <AntDesign name="calendar" size={SPACING * 2} color='#52575D' />
            <TextPaper style={styles.textRelease}> {data.released_on.slice(0, data.released_on.indexOf("-"))} | </TextPaper>
            <AntDesign name="clockcircleo" size={SPACING * 2} color='#52575D' />
            <TextPaper style={styles.textRelease}> {data.length} |</TextPaper>
            <AntDesign name="team" size={SPACING * 2} color='#52575D' />
            {typeof data.director !== "string" ? (
              data.director.map((item, index) =>
                index == 0 ? (
                  <TextPaper style={styles.textRelease} key={index}>
                    {" "}
                    {item}
                  </TextPaper>
                ) : (
                  <TextPaper style={styles.textRelease} key={index}>
                    , {item}
                  </TextPaper>
                )
              )
            ) : (
              <TextPaper style={styles.textRelease}> {data.director}</TextPaper>
            )}
          </View>
          <View style={styles.castContainer}>
            <TextPaper style={styles.castText}>Cast: </TextPaper>
            {data.cast.map((item, index) =>
              index == 0 ? (
                <TextPaper key={index} style={styles.castText}>
                  {item}
                </TextPaper>
              ) : (
                <TextPaper key={index} style={styles.castText}>
                  , {item}
                </TextPaper>
              )
            )}
          </View>
          <ScrollView
            style={styles.overviewContainer}
            showsVerticalScrollIndicator={false}
          >
            <TextPaper style={styles.textOverview}>{data.overview}</TextPaper>
          </ScrollView>
        </View>
      </View>
    </View>
  )

}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerData: {
    // position: 'absolute', bottom: SPACING * 0, paddingHorizontal: SPACING * 2
    paddingHorizontal: SPACING * 2,
    //backgroundColor: 'blue', height: '100%'
  },
  poster: {
    borderRadius: SPACING * 1.5,
    width: SPACING * 15,
    height: SPACING * 25,
    marginRight: SPACING,
  },
  headerText: {
    alignItems: "flex-start",
    width: SPACING * 20,
    height: SPACING * 25,
    justifyContent: "space-between",
  },
  title: {
    fontSize: SPACING * 2,
    color: "white",
    width: "100%",
    fontWeight: "bold",
    marginTop: "30%",
  },
  body: {
    flex: 5,
  },
  bodyContainer: {
    paddingHorizontal: SPACING * 2,
  },
  textRelease: {
    fontSize: SPACING * 1.5,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
  },
  castContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  castText: {
    fontSize: SPACING * 1.5,
    fontWeight: "500",
  },
  textOverview: {
    fontWeight: "700",
    fontSize: SPACING * 2.5,
  },
  overviewContainer: {
    marginTop: SPACING * 2,
  },
})
