import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";

class NavBar extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

  render() {
      const { username, logout } = this.props
    return (

      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
            <img src={this.props.pencilLogo} width={30}/>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
          <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
          >
            <NavbarNav left>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              { username &&
                <NavItem>
                    <NavLink to="/mygames">My Games</NavLink>
                </NavItem>
              }
              {/* <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <div className="d-none d-md-inline">Dropdown</div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="#!">Action</DropdownItem>
                    <DropdownItem href="#!">Another Action</DropdownItem>
                    <DropdownItem href="#!">Something else here</DropdownItem>
                    <DropdownItem href="#!">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem> */}
            </NavbarNav>

            { username ?
            <NavbarNav right>
                <NavItem>
                <NavLink to='/' onClick={logout}>Logout</NavLink>
                </NavItem> 
                <NavItem>
                <NavLink to='/profile'>Profile</NavLink>
                </NavItem> 
            </NavbarNav>
            :
            <NavbarNav right>
              <NavItem>
                    <NavLink to='/login'>Login</NavLink>
              </NavItem>
              <NavItem>
                    <NavLink to='/signup'>Sign Up</NavLink>
              </NavItem>
            </NavbarNav>
            }

          </Collapse>
      </Navbar>
    );
  }
}

export default NavBar