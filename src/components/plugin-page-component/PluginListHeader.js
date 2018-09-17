import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginListHeader extends PureComponent {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    panelTitle: PropTypes.string.isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
      location: PropTypes.object,
    }),
  };

  state = {
    isFilterInputVisible: false,
  };

  toggleFilterInputVisibility = () => this.setState(prevState => ({ isFilterInputVisible: !prevState.isFilterInputVisible }),
    () => !this.state.isFilterInputVisible && this.props.onFilterChange({ target: { value: '' } })
  );

  historyGoBack = () => {
    this.context.router.history.goBack()
  };

  render() {
    const { isFilterInputVisible } = this.state;
    const { onFilterChange, panelTitle, isBtnExpandVisible, isBtnTableVisible, onExpand, name, currentPanel } = this.props;

    return (
      <div className="panel-heading">
        <div className="control-group right">
          { isBtnExpandVisible ? <PTButton className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" onClick={() => onExpand(name, currentPanel)}>
            <i className="btn-icon fa fa-expand" />
            <i className="btn-icon fa fa-compress" />
          </PTButton> : null }
          { isBtnTableVisible ? <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle btn-table">
            <i className="btn-icon fa fa-table" />
          </PTButton> : null }
          <PTButton className="btn btn-success btn-inverse btn-filter" onClick={this.toggleFilterInputVisibility}>
            {
              isFilterInputVisible ? null : <i className="btn-icon fa fa-filter" />
            }
          </PTButton>
        </div>
        <span className="arrow-back" onClick={this.historyGoBack}></span>
        <h3 className="panel-title">{panelTitle}</h3>
        {isFilterInputVisible && <div className="panel-filter">
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-filter" />
            </div>
            <input className="form-control" placeholder="Search this page..." onChange={onFilterChange} autoFocus />
            <span className="btn-close-filter" onClick={this.toggleFilterInputVisibility}></span>
          </div>
        </div>}
      </div>
    )
  }
}
