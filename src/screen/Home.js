import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import SPACING from '../../assets/config/SPACING'
import API from '../../assets/config/APIs'

const Home = ({ navigation }) => {

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>WOOKIE</Text>
                <Text style={styles.textHeader}>MOVIES</Text>
            </View>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {genres.map((genre, index) => (
                        <View key={index}>
                            <Text style={styles.textGenre}>{genre}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {data.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { id: item.id })}>
                                        {item.genres.includes(genre) ? <Image style={styles.imageGenre} source={{ uri: item.poster }} /> : null}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 6,
        marginTop: SPACING * 2
    },
    header: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    textHeader: {
        fontSize: SPACING * 4, fontWeight: '400'
    },
    body: {
        flex: 5, paddingHorizontal: SPACING * 2
    },
    textGenre: {
        fontSize: SPACING * 3, marginVertical: SPACING
    },
    imageGenre: {
        width: SPACING * 15, height: SPACING * 30, marginRight: SPACING, borderRadius: SPACING * 1.5
    }
})