import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Search = () => {
    return (
        <View style={styles.container}>
            <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})