import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator } from '../ui/LoadingIndicator';
import { Table } from '../ui/Table';

export const Races = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const racerRaces = useSelector(state => state.racesAPI.racerRaces);
    const loadingRacerRaces = useSelector(state => state.racesAPI.loadingRacerRaces);

    if (loadingRacerRaces) {
        return <LoadingIndicator />
    }

    if (!racerRaces?.MRData?.RaceTable?.Races.length) {
        return (
            <View style={styles.smile}>
                <MaterialCommunityIcons
                    name='emoticon-sad-outline'
                    size={50}
                    color='#474747'
                />
            </View>
        )
    }

    navigation.setOptions({
        headerTitle: route.params.name
    })

    const TableWrap = ({ children }) => (
        <Table padding={'0%'} column={9}>
            <Text>{children}</Text>
        </Table>
    )

    const IndexTable = (style, season, round, raceName, date, time, circuit, locality, country, report, disabled, url) => {
        return (
            <View
                style={style}
            >
                <TableWrap>
                    <Text>{season}</Text>
                </TableWrap>
                <TableWrap>
                    <Text style={styles.pernumber}>{round}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{raceName}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{date}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{time}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{circuit}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{locality}</Text>
                </TableWrap>
                <TableWrap>
                    <Text>{country}</Text>
                </TableWrap>
                <TableWrap>
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={() => Linking.openURL(url)}
                    >
                        <Text>{report}</Text>
                    </TouchableOpacity>
                </TableWrap>
            </View>
        )
    }

    return (
        <FlatList
            style={{
                flex: 1
            }}
            keyExtractor={(item, index) => index.toString()}
            data={racerRaces?.MRData?.RaceTable?.Races}
            renderItem={({ item, index }) => {
                const season = item.season;
                const round = item.round;
                const raceName = item.raceName;
                const date = item.date;
                const time = item.time ? item.time : '';
                const circuit = item.Circuit.circuitName;
                const locality = item.Circuit.Location.locality;
                const country = item.Circuit.Location.country;
                
                return (
                    <>
                        {index === 0 && IndexTable({
                            ...styles.racer,
                            ...styles.example
                            },
                            'Season',
                            'Round',
                            'Race Name',
                            'Date',
                            'Time',
                            'Circuit',
                            'Locality',
                            'Country',
                            'Info',
                            true
                        )}
                        {IndexTable({
                            ...styles.racer
                            },
                            season,
                            round,
                            raceName,
                            date,
                            time,
                            circuit,
                            locality,
                            country,
                            'Report',
                            false,
                            item.url
                        )}
                    </>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    racer: {
        flexDirection: 'row',
    },
    smile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    example: {
        backgroundColor: '#ccc'
    },
    biography: {
        textDecorationLine: 'underline',
        color: '#3969ab'
    },
    pernumber: {
        textAlign: 'center',
        fontSize: 12
    }
});