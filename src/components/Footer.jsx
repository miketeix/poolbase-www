import React from 'react';
import { footerSocial } from '../constants';

const Footer = () => (
  <footer id="footer">
    <div className="menu container-fluid four-columns">
      <div className="row">
        <div className="col-sm-6 col-md-3">
          <h4>Get started</h4>
          <ul>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">For participants</a>
            </li>
            <li>
              <a href="#">For pool creators</a>
            </li>
            <li>
              <a href="#">For developers</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-3">
          <h4>The company</h4>
          <ul>
            <li>
              <a href="#">Our vision</a>
            </li>
            <li>
              <a href="#">PoolBase company</a>
            </li>
            <li>
              <a href="#">Meet the team</a>
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
            {footerSocial.map(v => (
              <li key={v[0]}>
                <a href={v[1]}>
                  <i className={`fa fa-fw ${v[0]}`} />
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
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy</a>
        </div>
        <div className="col-xs-12 col-sm-6 copyright">
          Copyright &copy; 
{' '}
{new Date().getFullYear()} PoolBase
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
