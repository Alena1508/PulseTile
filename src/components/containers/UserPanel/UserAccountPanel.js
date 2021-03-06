import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lifecycle } from 'recompose';
import packageJSON from '../../../../package.json';
import { testConstants, isDevMode } from '../../../config/for-test.constants';
import PTButton from '../../ui-elements/PTButton/PTButton';
import UserAccountPanelSettings from './UserAccountPanelSettings';
import userAccountSelector from './selectors';
import { initialiseSelector } from '../App/selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { unmountOnBlur } from '../../../utils/HOCs/unmount-on-blur.utils';
import { logoutStart } from '../../../ducks/logout.duck';
import { themeConfigs } from '../../../themes.config';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ logoutStart }, dispatch) });

@connect(initialiseSelector)
@connect(userAccountSelector, mapDispatchToProps)
@lifecycle(unmountOnBlur)
export default class UserAccountPanel extends PureComponent {

  static propTypes = {
    user: PropTypes.shape().isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  renderToProfile() {
    this.context.router.history.push(clientUrls.USER_PROFILE);
  }

  render() {
    const { user, actions, onClick, onClose, initialiseData } = this.props;
    const varsionOfPulseTile = packageJSON.version;
    const varsionOfReact = packageJSON.dependencies.react;
    const imageLocation = '/images/user.jpg';
    const imageSource = isDevMode ? (testConstants.hostName + imageLocation) : imageLocation;
    return (
      <div className="dropdown-user dropdown-menu-right dropdown-menu">
        { themeConfigs.isShowUserPhoto ?
            <div className="user-profile-image" onClick={() => this.renderToProfile()}>
              <div className="img">
                <img src={imageSource} alt="" />
              </div>
            </div>
        : null }
        <div className="user-profile-info">
          <div
            className="user-profile-info__item name"
            onClick={() =>{
              this.context.router.history.push(clientUrls.USER_PROFILE);
              onClick('')
            }}
          >{user.given_name} {user.family_name}</div>
          <div className="user-profile-info__descr">
            <div className="user-profile-info__item role">{user.role}</div>
            <div className="user-profile-info__item email">{user.email}</div>
            <div className="user-profile-info__item birthday">10/05/2099</div>
          </div>
          { themeConfigs.isShowUserProfileSpecification ?
            <div className="specification">
              <div className="user-profile-info__title registered">Registered GP</div>
              <div className="user-profile-info__item version-back">About Showcase Stack; PulseTile version {varsionOfPulseTile}/QEWD_Ripple version {initialiseData.version}</div>
              <div className="user-profile-info__item version-front">React version {varsionOfReact}</div>
            </div>
            : null }
          <PTButton className="btn btn-theme btn-block btn-signout" onClick={actions.logoutStart}>
            <div>
              <span className="brn-text">Sign Out</span> <i className="btn-icon fa fa-sign-out" />
            </div>
          </PTButton>
        </div>
        { themeConfigs.isShowUserProfileSettings && <UserAccountPanelSettings onClose={onClose} /> }
      </div>
    )
  }
}
