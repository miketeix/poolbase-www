import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PillButton from '../PillButton.jsx';
import Footer from '../Footer.jsx';

const Template = () => (
  <div id="home-view">
    <div className="page-wrap">
      <div className="top-section bg-color-light box-shadow">
        <div className="relative">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 ">
                <h1>
                  <Link to="/pools/create" style={{ color: 'white' }}>
                    Create your Pool
                  </Link>
                </h1>
              </div>
              <div className="col-sm-6">
                <PillButton onClick={() => this.props.history.push('/pools/create')}>
                  Create a Pool
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

Template.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Template;
