import * as React from 'react';
import { Navbar } from 'rsuite';
import { Navbar as RBNavBar } from 'react-bootstrap';




export default class NavHeadMenu extends React.PureComponent<{}> {

    public render() {
        return (
            <Navbar appearance="default"  >

                <RBNavBar bg="light" expand="lg">
                    <Navbar.Header>
                        <div className="navbar-brand logo" style={{ paddingLeft: "1rem", display: "inline-block" }}>
                            <img className="navbar-brand logo" src="TestLogo.png" alt="" style={{ height: "3rem" }} />
                            Автомат по продаже напитков
                        </div>
                    </Navbar.Header>
                    <RBNavBar.Toggle aria-controls="basic-navbar-nav" />
                    <RBNavBar.Collapse id="basic-navbar-nav">
                        <Navbar.Body style={{ width: "100%" }}>

                        </Navbar.Body>
                    </RBNavBar.Collapse>
                </RBNavBar>
            </Navbar>

        )
    }


}


