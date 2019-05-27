import React from 'react';
import { View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';
import { Text, Card, Searchbar, ActivityIndicator, } from 'react-native-paper';
import { debounce, } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.state = {
            data: null,
            moreDataAvailable: true,
            searchPatientQuery: '',
        };

        this.onLoadMore = debounce(async () => {
            console.log(REACT_APP_SERVER_URL);
            if (this.state.moreDataAvailable) {
                const res = await fetch(`${REACT_APP_SERVER_URL}/examinations/${this.page++}?search=${this.state.searchPatientQuery}`);
                // const res = await fetch(`http://192.168.0.11:3010/examinations/${this.page++}?search=${this.state.searchPatientQuery}`);
                const newData = await res.json();
                this.setState(({ data: prevData }) => ({
                    data: [ ...(prevData || []), ...newData.data, ],
                    moreDataAvailable: newData.moreDataAvailable
                }));
            }
        }, 300);
    }

    setSearchPatientQuery = (searchPatientQuery) => {
        this.page = 0;
        this.setState({ searchPatientQuery, data: null, moreDataAvailable: true, }, this.onLoadMore);
    }

    componentDidMount() {
        this.onLoadMore();
    }

    render() {
        return (
            <Card style={{ flex: 1 }}>
            <Card.Title
                style={styles.header}
                title="Ostatnie badania" 
                titleStyle={styles.cardTitle} 
                right={() => <Searchbar
                    style={styles.searchStyle}
                    placeholder="Szukaj badań pacjenta..."
                    onChangeText={this.setSearchPatientQuery}
                    value={this.state.searchPatientQuery}
                />}
            />
            <Card.Content style={{ flex: 1 }}>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderPart}>Numer badania</Text>
                    <Text style={styles.listHeaderPart}>Numer pacjenta</Text>
                    <Text style={styles.listHeaderPart}>Data</Text>
                </View>
                {!this.state.data && (
                    <ActivityIndicator animating={true} />
                )}
                {this.state.data && (
                    <FlatList
                        style={styles.listContent}
                        onEndReached={this.onLoadMore}
                        keyExtractor={(item) => String(item.id)}
                        onEndReachedThreshold={0.75}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => { this.props.navigation.navigate('ExaminationResults', { id: item.id }); }}>
                                <View style={styles.listEntry}>
                                    <Text style={styles.listEntryPart}>{item.id}</Text>
                                    <Text style={styles.listEntryPart}>{item.patientId}</Text>
                                    <Text style={styles.listEntryPart}>{moment(item.date).format("Do MMM YYYY")}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyList}>Brak badań</Text>}
                    />
                )}
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
        textAlign: 'center',
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchStyle: {
        height: 30,
        width: '90%',
        marginBottom: 10,
    },
    cardTitle: {
        textAlign: 'center',
        flex: 1,
        margin: 10,
    },
    emptyList: {
        textAlign: 'center',
    },
});

export default History;