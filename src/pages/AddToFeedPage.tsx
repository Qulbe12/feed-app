import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {axiosInstance} from "../config/axios.config";

const AddToFeedPage = () => {
    const [newEntry, setNewEntry] = useState({name: "", comment: ""});
    const navigation = useNavigation()
    const handleAddEntry = () => {
        console.log('New entry added:', newEntry);
        axiosInstance.post("add-feed", newEntry).then((value) => {
            console.log(value.data)
            navigation.navigate('FeedDisplay' as never);
        }).catch((reason) => {
            console.log(reason)
        })
        setNewEntry({name: "", comment: ""});
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
            <Button title="Add feed" onPress={handleAddEntry}/>
        </View>
    );
};

export default AddToFeedPage;
