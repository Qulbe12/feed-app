import React, {useState} from 'react';
import {ActivityIndicator, Alert, Button, Text, TextInput, View} from "react-native";
import {axiosInstance} from "../config/axios.config";
import {router} from "expo-router";

const AddFeed = () => {
    const [newEntry, setNewEntry] = useState({name: "", comment: ""});
    const [loading, setLoading] = useState(false);

    const handleAddEntry = () => {
        if (!newEntry.name.trim() || !newEntry.comment.trim()) {
            Alert.alert("Error", "Name and comment are required.");
            return;
        }

        setLoading(true);

        axiosInstance.post("add-feed", newEntry)
            .then((value) => {
                router.navigate('/' as never);
            })
            .catch((reason) => {
                console.log(reason);
            })
            .finally(() => {
                setLoading(false);
                setNewEntry({name: "", comment: ""});
            });
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add to Feed Page</Text>
            <View style={{width: '80%'}}>
                <Text style={{marginLeft: 10}}>Name</Text>
                <TextInput
                    style={{borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10, width: '100%'}}
                    placeholder="Enter your name"
                    value={newEntry.name}
                    onChangeText={(text) => setNewEntry({...newEntry, name: text})}
                />
            </View>
            <View style={{width: '80%'}}>
                <Text style={{marginLeft: 10}}>Comment</Text>
                <TextInput
                    style={{borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10, width: '100%'}}
                    placeholder="Enter your comments here"
                    value={newEntry.comment}
                    onChangeText={(text) => setNewEntry({...newEntry, comment: text})}
                />
            </View>
            <Button title="Add feed" onPress={handleAddEntry} disabled={loading}/>
            {loading && <ActivityIndicator style={{marginTop: 20}} size="large" color="#0000ff"/>}
        </View>
    );
};

export default AddFeed;