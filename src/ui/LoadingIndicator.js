import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingIndicator = () => (
    <View style={styles.indicator}>
        <ActivityIndicator
            color='#3969ab'
            size='small'
        />
    </View>
)

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})