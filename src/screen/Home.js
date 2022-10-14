import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import SPACING from "../../assets/config/SPACING"
import API from "../../assets/config/APIs"
import { useDispatch, useSelector } from "react-redux"
import { getMovies } from "../redux/movieSlice"
import Carousel from "react-native-snap-carousel"

const Home = ({ navigation }) => {
  const dispatch = useDispatch()

  const moviesData = useSelector((state) => state.movie.moviesData)
  const genresData = useSelector((state) => state.movie.genresData)
  const filterData = useSelector((state) => state.movie.filterData)

  const windowWidth = Dimensions.get("screen").width

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

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <Image style={styles.imageGenre} source={{ uri: item.poster }} />
      </TouchableOpacity>
    )
  }

  if (!filterData) {
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
          {filterData.map((data, index) => (
            <View key={index}>
              <Text style={styles.textGenre}>{data.genre}</Text>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.movies.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("Detail", { id: item.id })
                    }
                  >
                    <Image
                      style={styles.imageGenre}
                      source={{ uri: item.poster }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView> */}
              <Carousel
                data={data.movies}
                sliderWidth={windowWidth - SPACING * 4}
                itemWidth={SPACING * 20}
                itemHeight={SPACING * 30}
                renderItem={({ item }) => renderItem(item)}
                loop={true}
              />
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
    resizeMode: "cover",
    borderRadius: SPACING * 1.5,
  },
})
