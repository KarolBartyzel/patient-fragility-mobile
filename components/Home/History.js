import React from 'react';
import { View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { SERVER_URL, } from 'react-native-dotenv';
import { Text, Card, } from 'react-native-paper';
import { debounce, } from 'lodash';
import PropTypes from 'prop-types';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.state = {
            data: [],
            hasMore: true,
        };

        this.onLoadMore = debounce(async () => {
            if (this.state.hasMore) {
                const res = await fetch(`${SERVER_URL}/examinations/${this.page++}`);
                const newData = await res.json();
                this.setState(({ data: prevData }) => ({
                    data: [ ...prevData, ...newData.data, ],
                    hasMore: newData.hasMore
                }));
            }
        }, 300);
    }

    componentDidMount() {
        this.onLoadMore();
    }

    render() {
        return (
            <Card style={{ flex: 1 }}>
            <Card.Title titleStyle={styles.cardTitleStyle} title="Ostatnie badania" />
            <Card.Content style={{ flex: 1 }}>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderPart}>Id pacjenta</Text>
                    <Text style={styles.listHeaderPart}>Data</Text>
                    <Text style={styles.listHeaderPart}>Stan pacjenta</Text>
                </View>
                <FlatList
                    style={styles.listContent}
                    onEndReached={this.onLoadMore}
                    keyExtractor={(item) => String(item.id)}
                    onEndReachedThreshold={0.75}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('ExaminationDetails', { id: item.id }); }}>
                            <View style={styles.listEntry}>
                                <Text style={styles.listEntryPart}>{item.patientId}</Text>
                                <Text style={styles.listEntryPart}>{item.date}</Text>
                                <Text style={styles.listEntryPart}>{item.grade}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </Card.Content>
        </Card>
        );
    }
}

History.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    listHeaderPart: {
        flex: 1,
        textAlign: 'center',
    },
    listContent: {
        width: '100%',
    },

    listEntry: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    listEntryPart: {
        flex: 1,
        textAlign: 'center',
    },
    cardTitleStyle: {
        textAlign: 'center'
    },
});

export default History;