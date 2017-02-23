import React, { PureComponent } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

export default class Nav extends PureComponent {
  routes = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: 'record',
      text: 'Record'
    },
  ]
  _createMenuItemLink = ({path, text}) => (
    <Link key={path} to={path}>
      <MenuItem onTouchTap={this.props.toggleSideNav}>
        {text}
      </MenuItem>
    </Link>
  )
  render() {
    return (
      <div>
        <AppBar
          title="Echo Loop"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.props.toggleSideNav}
          onTitleTouchTap={this.props.toggleSideNav}
        />
        <Drawer open={this.props.sideNavOpen}>
          {this.routes.map(r => this._createMenuItemLink(r))}
        </Drawer>
      </div>
    )
  }
}
