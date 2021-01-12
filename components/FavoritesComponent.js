import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';

import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler'


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    }
};

const matchDispatchToProps = {
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
}

class Favorites extends Component {

    static navigationOptions = {
        title: 'Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoritesItem = ({ item }) => {

            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() => this.props.deleteFavorite(item.id)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                        />
                    </View>
                </SwipeRow>
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


const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});


export default connect(mapStateToProps, matchDispatchToProps)(Favorites);