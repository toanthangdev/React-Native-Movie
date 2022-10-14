import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import SPACING from "../../assets/config/SPACING"
import API from "../../assets/config/APIs"
import { useDispatch, useSelector } from "react-redux"
import movieSlice from "../redux/movieSlice"
import { getMovies } from "../redux/movieSlice"

const Home = ({ navigation }) => {
  const dispatch = useDispatch()

  const moviesData = useSelector((state) => state.movie.moviesData)
  const genresData = useSelector((state) => state.movie.genresData)

  useEffect(() => {
    //getAPIs()
    dispatch(getMovies())
    return () => {}
  }, [])

  //   const getAPIs = () => {
  //     API.defaults.headers.common["Authorization"] = "Bearer Wookie2019"
  //     API.get("movies")
  //       .then((res) => {
  //         getGenres(res.data.movies)
  //         setData(res.data.movies)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }

  if (!moviesData) {
    return null
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>WOOKIE</Text>
        <Text style={styles.textHeader}>MOVIES</Text>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {genresData.map((genre, index) => (
            <View key={index}>
              <Text style={styles.textGenre}>{genre}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {moviesData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("Detail", { id: item.id })
                    }
                  >
                    {item.genres.includes(genre) ? (
                      <Image
                        style={styles.imageGenre}
                        source={{ uri: item.poster }}
                      />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 6,
    marginTop: SPACING * 2,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: SPACING * 4,
    fontWeight: "400",
  },
  body: {
    flex: 5,
    paddingHorizontal: SPACING * 2,
  },
  textGenre: {
    fontSize: SPACING * 3,
    marginVertical: SPACING,
  },
  imageGenre: {
    width: SPACING * 20,
    height: SPACING * 30,
    marginRight: SPACING,
    resizeMode: 'cover',
    borderRadius: SPACING * 1.5,
  },
})
