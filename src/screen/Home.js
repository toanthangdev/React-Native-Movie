import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import SPACING from '../../assets/config/SPACING'
import API from '../../assets/config/APIs'

const Home = ({navigation}) => {

    const [data, setData] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getAPIs()
    }, [])

    const getAPIs = () => {
        API.defaults.headers.common['Authorization'] = 'Bearer Wookie2019';
        API.get('movies').then((res) => {
            getGenres(res.data.movies)
            setData(res.data.movies)
        }).catch(error => {
            console.log(error)
        })
    }

    if (!data) {
        return null
    }

    const getGenres = (data) => {
        data.forEach((item) => {
            item.genres.forEach((genre) => {
                if (!genres.includes(genre)) {
                    genres.push(genre)
                }
                setGenres(genres)
            })
        })
        genres.sort();
    }

    return (
        <SafeAreaView style={{ flex: 6 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: SPACING * 4, fontWeight: '400' }}>WOOKIE</Text>
                <Text style={{ fontSize: SPACING * 4, fontWeight: '400' }}>MOVIES</Text>
            </View>
            <View style={{ flex: 5, paddingHorizontal: SPACING * 2 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {genres.map((genre, index) => (
                        <View key={index}>
                            <Text style={{ fontSize: SPACING * 3, marginVertical: SPACING }}>{genre}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {data.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', {id: item.id})}>
                                        {item.genres.includes(genre) ? <Image style={{ width: SPACING * 15, height: SPACING * 30, marginRight: SPACING, borderRadius: SPACING * 2 }} source={{ uri: item.poster }} /> : null}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})