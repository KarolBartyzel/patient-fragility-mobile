import React from 'react';
import { StyleSheet } from 'react-native';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';
import { Card } from 'react-native-paper';
import { debounce, } from 'lodash';
import PropTypes from 'prop-types';

import NewPatient from './NewPatient';
import PatientSearch from './PatientSearch';
import PatientsList from './PatientsList';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.state = {
            data: null,
            moreDataAvailable: true,
            searchPatientQuery: '',
        };

        this.onLoadMore = debounce(async () => {
            if (this.state.moreDataAvailable) {
                const res = await fetch(`${REACT_APP_SERVER_URL}/patients/${this.page++}?search=${this.state.searchPatientQuery}`);
                const newData = await res.json();
                this.setState(({ data: prevData }) => ({
                    data: [ ...(prevData || []), ...newData.data, ],
                    moreDataAvailable: newData.moreDataAvailable
                }));
            }
        }, 300);

        this.onNavigateBack = this.props.navigation.addListener('willFocus', () => {
            this.page = 0;
            this.setState({
                data: null,
                moreDataAvailable: true,
                searchPatientQuery: '',
            }, this.onLoadMore);
        });
    }

    setSearchPatientQuery = (searchPatientQuery) => {
        this.page = 0;
        this.setState({ searchPatientQuery, data: null, moreDataAvailable: true, }, this.onLoadMore);
    }

    componentDidMount() {
        this.onLoadMore();
    }

    componentWillUnmount() {
        this.onNavigateBack();
    }

    render() {
        return (
            <>
            <Card style={styles.homeCard}>
                <NewPatient navigation={this.props.navigation} />
                <PatientSearch searchPatientQuery={this.state.searchPatientQuery} setSearchPatientQuery={(searchPatientQuery) => this.setState({ searchPatientQuery })} />
                <PatientsList patients={this.state.data} navigation={this.props.navigation} onLoadMore={this.onLoadMore} />
            </Card>
            </>
        );
    }
}

Home.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    homeCard: {
        flex: 1
    }
});

export default Home;