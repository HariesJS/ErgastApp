import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const ResponseError = ({ error, onPress }) => (
    <View style={styles.error}>
        <Text>{error}</Text>
        {onPress && <Button title='Refresh' onPress={onPress} />}
    </View>
)

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})