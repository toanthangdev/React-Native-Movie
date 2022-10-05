import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, ScrollView } from 'react-native'
import API from '../../assets/config/APIs'
import SPACING from '../../assets/config/SPACING'
import { Rating, AirbnbRating } from 'react-native-ratings';

const Detail = ({ route }) => {

    const [dataAPIs, setDataAPIs] = useState([])
    const [data, setData] = useState([])
    const [cast, setCast] = useState([])
    const [rating, setRating] = useState(null)
    const [yearReleased, setYearReleased] = useState('')

    useEffect(() => {
        getAPIs()
    }, [])

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
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 4, width: '100%', height: '70%' }} source={{ uri: data.backdrop }}>
                <View style={{ position: 'absolute', bottom: SPACING * 0, paddingHorizontal: SPACING * 2 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ borderRadius: SPACING * 2, width: SPACING * 15, height: SPACING * 25, marginRight: SPACING }} source={{ uri: data.poster }} />
                        <View style={{ justifyContent: 'space-between', width: '100%', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: SPACING * 2, color: 'white', top: '40%', width: '40%', fontWeight: 'bold' }}>{data.title}({rating})</Text>
                            <AirbnbRating count={10} defaultRating={rating} size={SPACING * 1.3} isDisabled={true} reviews={[]} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <SafeAreaView style={{ flex: 5 }}>
                <View style={{ paddingHorizontal: SPACING * 2, marginVertical: SPACING * 2 }}>
                    <Text style={{ fontSize: SPACING * 1.5, marginBottom: SPACING * 2, justifyContent: 'center', alignItems: 'center' }}>{yearReleased} | {data.length} | {data.director}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: SPACING * 1.5 }}>Cast: </Text>
                        {cast.map((item, index) => (
                            index == 0 ? <Text key={index} style={{ fontSize: SPACING * 1.5 }}>{item}</Text> : <Text key={index} style={{ fontSize: SPACING * 1.5 }}>, {item}</Text>
                        ))}
                    </View>
                    <ScrollView style={{ marginTop: SPACING * 2 }} showsVerticalScrollIndicator={false}>
                        <Text style={{ fontWeight: '700', fontSize: SPACING * 2.5 }} >{data.overview}</Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})