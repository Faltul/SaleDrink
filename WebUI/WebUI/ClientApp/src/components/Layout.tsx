import * as React from 'react';
import { Container, Header, Content, Footer } from 'rsuite';
import NavHeadMenu from './navigation/NavHeadMenu';
import ToastNotification from './generic/component/ToastNotification';


export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <ToastNotification />
                <Container>
                        <Header>
                            <NavHeadMenu />
                        </Header>
                        <Container >
                            <Content >
                                {this.props.children}
                            </Content>
                        </Container>
                        <Footer>
                        </Footer>
                </Container>
            </React.Fragment>
        );
    }
}