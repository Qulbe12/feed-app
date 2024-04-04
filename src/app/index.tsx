import React, {useState} from 'react';
import {ActivityIndicator, Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {IFeedResponse} from "../interfaces/IFeedResponse";
import {axiosInstance} from "../config/axios.config";
import {AxiosError} from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {router} from "expo-router";

const Index = () => {
    const [feeds, setFeeds] = useState<IFeedResponse[]>([])
    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)

    const fetchFeeds = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get<IFeedResponse[]>('get-all-feeds');
            setFeeds(response.data);
            setLoading(false)
        } catch (reason) {
            const error = reason as AxiosError
            setError(error.message);
            setLoading(false)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await fetchFeeds();
            };
            fetchData();
        }, [])
    );
    return (
        <>
            {loading ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10}}>
                    <ActivityIndicator style={{marginTop: 20}} size="large" color="#0000ff"/>
                </View> :
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10}}>
                        {error ? (
                            <Text>Error: {error}</Text>
                        ) : (
                            feeds?.map((feed, index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <Text style={styles.heading}>Name:</Text>
                                        <Text style={styles.name}>{feed.name}</Text>
                                        <Text style={styles.heading}>Comment:</Text>
                                        <Text style={styles.comment}>{feed.comment}</Text>
                                    </View>
                                )
                            })
                        )}

                        <Button title="Add to Feed" onPress={() => router.navigate('/add-feed')}/>
                    </View>
                </ScrollView>}

        </>

    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "80%"
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        marginBottom: 5,
    },
    comment: {
        fontSize: 16,
        color: '#555',
    },
});

export default Index;