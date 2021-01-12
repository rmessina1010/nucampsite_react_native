import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    }
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoritesItem = ({ item }) => {

            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        }

        if (this.props.campsites.isLoading) {
            return (<Loading />);
        }

        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{props.campsites.errMess}</Text>
                </View>
            )
        }

        return (

            <FlatList
                data={this.props.campsites.campsites.filter(campsite => this.props.favorites.includes(campsite.id))}
                renderItem={renderFavoritesItem}
                keyExtractor={item => item.id.toString()}

            />
        );

    }
}


export default connect(mapStateToProps)(Favorites);