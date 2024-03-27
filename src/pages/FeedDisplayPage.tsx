import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {axiosInstance} from "../config/axios.config";
import {IFeedResponse} from "../interfaces/IFeedResponse";
import {AxiosError} from "axios";

const FeedDisplayPage = () => {

    const [feeds, setFeeds] = useState<IFeedResponse[]>([])
    const [error, setError] = useState("")

    const fetchFeeds = async () => {
        try {
            const response = await axiosInstance.get<IFeedResponse[]>('get-all-feeds');
            setFeeds(response.data);
        } catch (reason) {
            const error = reason as AxiosError
            setError(error.message);
        }
    };

    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await fetchFeeds();
            };
            fetchData();
        }, [])
    );
    return (

        <ScrollView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10}}>
                {error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    feeds?.map((feed) => {
                        return (

                            <View style={styles.card}>
                                <Text style={styles.heading}>Name:</Text>
                                <Text style={styles.name}>{feed.name}</Text>
                                <Text style={styles.heading}>Comment:</Text>
                                <Text style={styles.comment}>{feed.comment}</Text>
                            </View>
                        )
                    })
                )}

                <Button title="Add to Feed" onPress={() => navigation.navigate('AddToFeed' as never)}/>
            </View>
        </ScrollView>

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

export default FeedDisplayPage;
