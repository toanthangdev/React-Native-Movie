import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import SPACING from '../../assets/config/SPACING'
import API from '../../assets/config/APIs'
import { Searchbar } from 'react-native-paper'
import { AirbnbRating } from 'react-native-ratings'

const Search = ({ navigation }) => {

    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        getAPIs()
    }, [])

    const getAPIs = () => {
        API.defaults.headers.common['Authorization'] = 'Bearer Wookie2019';
        API.get('movies').then((res) => {
            setFilterData(res.data.movies)
            setData(res.data.movies)
        }).catch(error => {
            console.log(error)
        })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilterData(newData)
            setSearch(text)
        } else {
            setFilterData(data)
            setSearch(text)
        }
    }

    const Movie = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })} style={styles.movieCard}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.imageCard} source={{ uri: item.poster }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>
                            {item.title}
                        </Text>
                        <AirbnbRating count={10} defaultRating={item.imdb_rating} size={SPACING * 1.3} isDisabled={true} reviews={[]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.textClassification}>{item.classification}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>LIST MOVIES</Text>
                <Searchbar
                    placeholder="Search..."
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>
            <View style={styles.body}>
                <FlatList showsVerticalScrollIndicator={false} data={filterData} keyExtractor={item => item.id} renderItem={({ item }) => (
                    <Movie item={item} />
                )} />
            </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1, alignItems: 'center', paddingHorizontal: SPACING * 2
    },
    textHeader: {
        fontSize: SPACING * 3, fontWeight: "bold", marginBottom: SPACING * 2
    },
    body: {
        flex: 4
    },
    movieCard: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: SPACING * 2, marginBottom: SPACING, padding: SPACING, borderRadius: SPACING, shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    imageCard: {
        width: SPACING * 6, height: SPACING * 9, marginRight: SPACING,
    },
    textContainer: {
        alignItems: 'flex-start', width: '70%'
    },
    textTitle: {
        fontSize: SPACING * 2, fontWeight: "500"
    },
    textClassification: {
        fontSize: SPACING * 1.5
    }
})