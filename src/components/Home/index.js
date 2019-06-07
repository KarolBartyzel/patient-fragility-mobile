import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { debounce, } from 'lodash';
import PropTypes from 'prop-types';

import NewPatient from './NewPatient';
import PatientSearch from './PatientSearch';
import PatientsList from './PatientsList';

import { patients } from './../../firebase';

const PAGE_SIZE = 10;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            searchPatientQuery: '',
        };

        this.startAt = undefined;
        this.onLoadMore = debounce(async () => {
            if (this.startAt !== null) {
                const { items, startAt } = await patients.getPatients(PAGE_SIZE, this.startAt, this.state.searchPatientQuery);
                this.startAt = startAt;
                this.setState(({ data: prevData }) => ({
                    data: this.state.searchPatientQuery ? items : [ ...(prevData || []), ...items, ],
                }));
            }
        }, 300);

        this.onNavigateBack = this.props.addListener('willFocus', () => {
            this.startAt = undefined;

            this.setState({
                data: null,
                searchPatientQuery: '',
                typingTimeout: 0
            }, this.onLoadMore);
        });
    }

    setSearchPatientQuery = (searchPatientQuery) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            searchPatientQuery: searchPatientQuery.trim().toLowerCase(),
            typingTimeout: setTimeout(() => {
                this.startAt = undefined;
                this.setState({ data: null }, this.onLoadMore);
            }, 300)
        });
    }

    componentDidMount() {
        this.onLoadMore();
    }

    componentWillUnmount() {
        this.onNavigateBack.remove();
    }

    render() {
        return (
            <>
            <Card style={styles.homeCard}>
                <NewPatient navigate={this.props.navigate} />
                <PatientSearch searchPatientQuery={this.state.searchPatientQuery} setSearchPatientQuery={this.setSearchPatientQuery} />
                <PatientsList patients={this.state.data} navigate={this.props.navigate} onLoadMore={this.onLoadMore} />
            </Card>
            </>
        );
    }
}

Home.propTypes = {
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    homeCard: {
        flex: 1
    }
});

export default Home;
