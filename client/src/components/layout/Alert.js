import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
	<div className="mb-2" key={alert.id}>
 	<small className={`text-${alert.alertType}`}>{alert.msg}</small> 
    </div>

	));






Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);