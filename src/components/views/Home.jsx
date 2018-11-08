import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PillButton from '../PillButton.jsx';
import TeamCard from '../TeamCard.jsx';
import { teamList } from '../../constants';
import User from '../../models/User';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileMenu: false,
      workflowSwitch: true,
    };

    this.preloadPics = [
      'https://www.paypalobjects.com/digitalassets/c/website/marketing/emea/de/de/home/de-buyonline-browser1.png',
      'https://www.paypalobjects.com/digitalassets/c/website/marketing/emea/de/de/home/de-sellonline-browser2.png',
    ];

    this.footerSocial = [
      ['fa-github', 'http://website1.com'],
      ['fa-twitter', 'http://website2.com'],
      ['fa-facebook', 'http://website3.com'],
      ['fa-medium', 'http://website4.com'],
      ['fa-reddit-alien', 'http://website5.com'],
      ['fa-instagram', 'http://website6.com'],
      ['fa-youtube', 'http://website7.com'],
      ['fa-telegram', 'http://website8.com'],
      ['fa-linkedin', 'http://website9.com'],
    ];
  }

  componentDidMount() {
    this.preloadPics.forEach(picture => {
      const img = new Image();
      img.src = picture;
    });
  }

  render() {
    return (
      <div id="home-view">
        <div className="page-wrap">
          <div className="top-section bg-color-light box-shadow">
            <div className="relative">
              <div className="container">
                <div className="row">
                  <div className="col-sm-5 ">
                    <h1>Fast, Safe way for cryptocurrency pooling</h1>
                    <p>Pool digital currency today with the security of smart contracts</p>
                    <PillButton onClick={() => this.props.history.push('/pools/create')}>
                      Create a Pool
                    </PillButton>
                  </div>
                  <div className="col-sm-7">
                    <img
                      className="pb-screenshot"
                      src="/img/screenshots.png"
                      alt="Poolbase Screenshot"
                    />
                  </div>
                </div>
              </div>
              <div className="bottom-banner">
                <div className="skew2 cover-all bg-color-medium" />
                <div className="relative">
                  <div className="container wallet-providers">
                    <a
                      className="wallet-logo"
                      href="https://metamask.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/img/metamask-logo-white.png" height="60px" alt="Metamask logo" />
                    </a>
                    <a
                      className="wallet-logo"
                      href="https://mycrypto.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/img/mycrypto-logo-white.png" height="60px" alt="My Crypto logo" />
                    </a>
                    <a
                      className="wallet-logo"
                      href="https://www.myetherwallet.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/img/myetherwallet_logo_white.png"
                        height="60px"
                        alt="My Ether Wallet logo"
                      />
                    </a>
                    <a
                      className="wallet-logo"
                      href="https://www.ethereum.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/img/ethereum-logo-white.png" height="70px" alt="Ethereum.org" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="workflow-section">
            <h2>Our Platform</h2>

            <div className="switch">
              <span
                className={this.state.workflowSwitch ? 'active' : ''}
                onClick={() => this.setState({ workflowSwitch: true })}
              >
                For investors
              </span>
              <span
                className={!this.state.workflowSwitch ? 'active' : ''}
                onClick={() => this.setState({ workflowSwitch: false })}
              >
                For pool creators
              </span>
            </div>

            {this.state.workflowSwitch && (
              <div>
                <div className="steps container">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="\img\Investor_1.png"
                        alt="Get a Poollink"
                      />
                      <span className="arrow" />
                      <div className="content">
                        <div className="circle">1</div>
                        <p>
                           You will get the link to a pool by the admin of your pooling group.<br />
                         <a href="https://poolbase.zendesk.com/hc/en-us/articles/360004747851-Where-I-can-find-pools-">About Pools</a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        src="\img\Investor_2.png"
                        alt="Contribute to Pool"
                      />
                      <span className="arrow" />
                      <div className="content">
                        <div className="circle">2</div>
                        <p>
                            With some clicks you can participate in the project. Send a transaction to the pool smart contract and you are in!
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        src="\img\Investor_3.png"
                        alt="Get Token"
                      />
                      <div className="content">
                        <div className="circle">3</div>
                        <p>
                           After the sale is finished, you can claim your exact number of token with a simple transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="learn-more">
                  <a href="https://poolbase.zendesk.com/hc/en-us/categories/360000863432-Using-PoolBase">Learn More</a>
                </div>
              </div>
            )}

            {!this.state.workflowSwitch && (
              <div>
                <div className="steps container">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="/img/Creator_1.png"
                        alt="Create Pool"
                      />
                      <span className="arrow" />
                      <div className="content">
                        <div className="circle">1</div>
                        <p>
                          We will create an individual smart-contract for your pool, you have the full control. We have no access to the funds. You will receive a custom link for your investors.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        src="/img/Creator_2.png"
                        alt="Send Funds"
                      />
                      <span className="arrow" />
                      <div className="content">
                        <div className="circle">2</div>
                        <p>
                          You can send the funds at any time. Contributions and withdrawals are automatically disabled.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        src="/img/Creator_3.png"
                        alt="Confirm Token"
                      />
                      <div className="content">
                        <div className="circle">3</div>
                        <p>
                           Once you confirmed the token, your can lay back. The investors can now get their token.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="learn-more">
                  <a href="https://poolbase.zendesk.com/hc/en-us/categories/360000519791-Pool-Creator">Learn More</a>
                </div>
              </div>
            )}
          </section>

          <section className="advantages-section four-columns">
            <h2>That speaks for PoolBase</h2>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <h4>More security</h4>
                  <p>
                    By using the Ethereum blockchain and smart contracts we can establish a high
                    level of trust for investors.
                  </p>
                  <p>
                    <a href="">Read more about security</a>
                  </p>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>Quick and easy to use</h4>
                  <p>
                    We build PoolBase to enable people around the globe to take part in the new way
                    of investing. It has never been easier.
                  </p>
                  <p>
                    <a href="">Create your Pool</a>
                  </p>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>Low cost</h4>
                  <p>
                    Investing collectively has never been more efficient. By using newest technology
                    we are able to provide lowest fees.
                  </p>
                  <p>
                    <a href="">Read more about the fees</a>
                  </p>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>The future is here</h4>
                  <p>
                    Blockchain is the accelerator for the ideas of tomorrow. Fund your own project
                    or participate directly in new ideas.
                  </p>
                  <p>
                    <a href="">Read more about our product</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="team-section four-columns">
            <h2>The team</h2>
            <div className="container">
              <div className="row">
                {teamList.map((memberDetails, index) => (
                  <TeamCard key={index} {...memberDetails} />
                ))}
              </div>
            </div>
          </section>

          <footer id="footer">
            <div className="menu container-fluid four-columns">
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <h4>Get started</h4>
                  <ul>
                    <li>
                      <a href="">FAQs</a>
                    </li>
                    <li>
                      <a href="">For participants</a>
                    </li>
                    <li>
                      <a href="">For pool creators</a>
                    </li>
                    <li>
                      <a href="">For developers</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>The company</h4>
                  <ul>
                    <li>
                      <a href="">Our vision</a>
                    </li>
                    <li>
                      <a href="">PoolBase company</a>
                    </li>
                    <li>
                      <a href="">Meet the team</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>Support</h4>
                  <ul>
                    <li>
                      <a href="https://poolbase.zendesk.com">Help center</a>
                    </li>
                    <li>
                      <a href="">Contact us</a>
                    </li>
                    <li>
                      <a href="https://t.me/joinchat/Hu3hDRJXVFf4m1DFUNxaKQ">Telegram support</a>
                    </li>
                    <li>
                      <a href="">Reddit group</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3">
                  <h4>Social</h4>
                  <ol>
                    {this.footerSocial.map((v, i) => (
                      <li key={v[0]}>
                        <a href={v[1]}>
                          <i className={'fa fa-fw ' + v[0]} />
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="container-fluid bottom-line">
              <div className="row">
                <div className="col-xs-12 col-sm-6 links">
                  <a href="">Terms &amp; Conditions</a>
                  <a href="">Privacy</a>
                </div>
                <div className="col-xs-12 col-sm-6 copyright">Copyright &copy; 2018 PoolBase</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  history: PropTypes.shape({}).isRequired,
};

Home.defaultProps = {
  currentUser: undefined,
};

export default Home;
