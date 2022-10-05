import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import API from '../../assets/config/APIs'
import SPACING from '../../assets/config/SPACING'
import { AirbnbRating } from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail = ({ route }) => {

    const [dataAPIs, setDataAPIs] = useState([])
    const [data, setData] = useState([])
    const [cast, setCast] = useState([])
    const [rating, setRating] = useState(null)
    const [liked, setLiked] = useState('')
    const [yearReleased, setYearReleased] = useState('')

    useEffect(() => {
        getAPIs()
        getLiked()
    }, [])

    const onLike = async (value) => {
        try {
            setLiked(liked + ' ' + value)
            await AsyncStorage.setItem('Liked', liked)
        } catch (error) {
            console.log(error)
        }ƒ
    }

    const getLiked = async () => {
        try {
            const value = await AsyncStorage.getItem('Liked')
            if (value != null) {
                setLiked(value)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getAPIs = () => {
        API.defaults.headers.common['Authorization'] = 'Bearer Wookie2019';
        API.get('movies').then((res) => {
            res.data.movies.forEach((item) => {
                if (item.id === route.params.id) {
                    setData(item)
                    setRating(item.imdb_rating)
                    setYearReleased(item.released_on.slice(0, item.released_on.indexOf('-')))
                    setCast(item.cast)
                }
            })
            setDataAPIs(res.data.movies)
        }).catch(error => {
            console.log(error)
        })
    }

    if (!data) {
        return null
    }

    return (
        <View style={styles.container}>
            {console.log(liked)}
            <ImageBackground style={styles.header} source={{ uri: data.backdrop }}>
                <View style={styles.headerData}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.poster} source={{ uri: data.poster }} />
                        <View style={styles.headerText}>
                            <Text style={styles.title}>{data.title}({rating})</Text>
                            <View>
                                <TouchableOpacity onPress={() => onLike(data.id)}>
                                    <FontAwesome name='heart-o' size={SPACING * 3} color='red' />
                                </TouchableOpacity>
                                <AirbnbRating count={10} defaultRating={rating} size={SPACING * 1.3} isDisabled={true} reviews={[]} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <SafeAreaView style={styles.body}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.textRelease}>{yearReleased} | {data.length} | {data.director}</Text>
                    <View style={styles.castContainer}>
                        <Text style={styles.castText}>Cast: </Text>
                        {cast.map((item, index) => (
                            index == 0 ? <Text key={index} style={styles.castText}>{item}</Text> : <Text key={index} style={styles.castText}>, {item}</Text>
                        ))}
                    </View>
                    <ScrollView style={styles.overviewContainer} showsVerticalScrollIndicator={false}>
                        <Text style={styles.textOverview} >{data.overview}</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 4, width: '100%', height: '70%'
    },
    headerData: {
        position: 'absolute', bottom: SPACING * 0, paddingHorizontal: SPACING * 2
    },
    poster: {
        borderRadius: SPACING * 2, width: SPACING * 15, height: SPACING * 25, marginRight: SPACING
    },
    headerText: {
        justifyContent: 'space-between', width: '100%', alignItems: 'flex-start',
    },
    title: {
        fontSize: SPACING * 2, color: 'white', top: '40%', width: '40%', fontWeight: 'bold'
    },
    body: {
        flex: 5
    },
    bodyContainer: {
        paddingHorizontal: SPACING * 2, marginVertical: SPACING * 2
    },
    textRelease: {
        fontSize: SPACING * 1.5, marginBottom: SPACING * 2, justifyContent: 'center', alignItems: 'center'
    },
    castContainer: {
        width: '100%', flexDirection: 'row', flexWrap: 'wrap'
    },
    castText: {
        fontSize: SPACING * 1.5
    },
    textOverview: {
        fontWeight: '700', fontSize: SPACING * 2.5
    },
    overviewContainer: {
        marginTop: SPACING * 2
    }
})