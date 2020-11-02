import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

export const Table = ({ children, isName, column = 5, padding = '1%' }) => (
    <View
        style={{
            ...styles.column,
            alignItems: isName ? 'flex-start' : 'center',
            width: Dimensions.get('window').width / column,
            padding
        }}
    >
        {children}
    </View>
)

const styles = StyleSheet.create({
    column: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
})