import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Linking } from 'react-native';
// import { getRacersDataThunk, loadMoreRacersDataThunk } from '../redux/reducers/racersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator } from '../ui/LoadingIndicator';
import { ResponseError } from '../ui/ResponseError';
import { getRacerRacesThunk } from '../redux/reducers/racesReducer';
import { Table } from '../ui/Table';
import { getRacersDataThunk, loadMoreRacersDataThunk } from '../redux/actions/racersReducerActions';

export const Racers = ({ navigation }) => {
    const dispatch = useDispatch();

    const racers = useSelector(state => state.racersAPI.racers);
    const loadingRacers = useSelector(state => state.racersAPI.loadingRacers);
    const responseError = useSelector(state => state.racesAPI.responseError);

    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        dispatch(getRacersDataThunk());
    }, []);

    if (loadingRacers) {
        return <LoadingIndicator />
    }

    if (responseError) {
        return <ResponseError error={responseError} onPress={() => dispatch(getRacersDataThunk())} />
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(getRacersDataThunk(true));
        setRefreshing(false);
    }
    
    const renderLoader = () => (
        <>
          {!loadingRacers && racers?.MRData && racers?.MRData?.offset !== racers?.MRData?.total && (
                <View style={{ padding: '5%' }}>
                    <LoadingIndicator />
                </View>
            )}
        </>
    )

    const loadMore = async () => {
        if (
            !loadingRacers && racers?.MRData && racers?.MRData?.offset !== racers?.MRData?.total
        ) {
            let pages;
            pages = Number(racers.MRData.offset) + 1;
            await dispatch(loadMoreRacersDataThunk(pages));
        }
    }

    const openRacer = (id, name) => {
        dispatch(getRacerRacesThunk(id));
        navigation.navigate('Races', { name });
    }

    return (
        <FlatList
            ListFooterComponent={renderLoader}
            onEndReached={loadMore}
            onEndReachedThreshold={2}
            refreshControl={
                <RefreshControl
                    colors={['#3969ab']}
                    tintColor="#3969ab"
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={{
                flex: 1
            }}
            keyExtractor={(item, index) => index.toString()}
            data={racers?.MRData?.DriverTable?.Drivers}
            renderItem={({ item, index }) => {
                const drivername = item.givenName + ' ' + item.familyName;
                const pernumber = item.permanentNumber ? item.permanentNumber : '';
                const nationality = item.nationality ? item.nationality : '';
                const birth = item.dateOfBirth;
                return (
                    <>
                        {index === 0 && (
                            <View
                                style={{ ...styles.racer, ...styles.example }}
                            >
                                <Table>
                                    <Text style={styles.racerName}>Driver Name</Text>
                                </Table>
                                <Table>
                                    <Text style={styles.pernumber}>Permanent Number</Text>
                                </Table>
                                <Table>
                                    <Text>Nationality</Text>
                                </Table>
                                <Table>
                                    <Text>DOB</Text>
                                </Table>
                                <Table>
                                    <Text
                                        numberOfLines={1}
                                    >Info</Text>
                                </Table>
                            </View>
                        )}
                        <View
                            style={{ ...styles.racer}}
                        >
                            <Table isName={true}>
                                <TouchableOpacity
                                    style={styles.racerBlock}
                                    onPress={() => openRacer(item.driverId, drivername)}
                                >
                                    <Text style={styles.racerName}>{drivername}</Text>
                                </TouchableOpacity>
                            </Table>
                            <Table>
                                <Text style={styles.pernumber}>{pernumber}</Text>
                            </Table>
                            <Table>
                                <Text>{nationality}</Text>
                            </Table>
                            <Table>
                                <Text>{birth}</Text>
                            </Table>
                            <Table>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(item.url)} // also i can make browser in app
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{ ...styles.biography }}
                                    >Biography</Text>
                                </TouchableOpacity>
                            </Table>
                        </View>
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
    racerName: {
        color: 'rgba(0,0,0,0.9)'
    },
    racerBlock: {
        flex: 1,
        justifyContent: 'center',
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