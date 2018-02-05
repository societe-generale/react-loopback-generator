import React, { Component } from 'react';
import { connect } from 'react-redux';

import HelloCard from '../../components/hello-card';
import styles from './style.css';

class HomeView extends Component {
  render() {
    const { authentication = {} } = this.props;
    return (
      <div className={styles.homeViewContainer}>
        <div className={styles.cardContainer}>
          <HelloCard authentication={authentication} />
        </div>
      </div>
    );
  }
}

HomeView.propTypes = HelloCard.propTypes;

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps)(HomeView);
