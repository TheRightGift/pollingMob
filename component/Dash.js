import React from 'react'
import {StyleSheet, StatusBar} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, ListItem, Footer } from 'native-base';
import AnimatedLoader from "react-native-animated-loader";
import {  } from "../state/actions";
import store from "../state/store";
import Core from "../Core";
import { connect } from "react-redux";
import Database from '../database';
const db = new Database();

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F93106',
    },
    footer: {
        backgroundColor: '#000000',
    }
});

class Dash extends React.Component {
	constructor(inProps) {

        super(inProps);
        
		this.state = {
            subj: [],
			loader: true
        };	
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */

    toSubjDash(e, id, subjName){
        e.preventDefault();

        this.props.navigation.navigate('SubjDash', {id : id, subjName: subjName });
    }

    goToUserProfile(){
        this.props.navigation.navigate('UserDash');
    }

    componentDidMount() {
		db.getUserSubjects().then((res) => {
            this.setState({ subj: res });          
        }).catch((err) => {
            console.log(err);
        });
	}

    render() {
        const { subj, loader } = this.state;
        if(subj.length < 1){
            return (
                <AnimatedLoader
                    visible={loader}
                    overlayColor="#FFFFFF"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require("../data.json")}
                />
            )
        } else {
            return (
                <Container>
                    <Header noLeft style={styles.header}>
                        <Left/>
                        <Body>
                            <Title>PREP50</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.goToUserProfile()}>
                                <Icon name='person' />
                            </Button>
                        </Right>
                    </Header>
                    <Content style={{marginTop: 15}}>
                        { 
                            subj.map(sb => 
                                <ListItem icon key={sb.id}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0AC9F1" }}>
                                            <Icon active name="book" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>{sb.subj}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={(e) => this.toSubjDash(e, sb.id, sb.subj)}>
                                            <Icon active name="arrow-forward" />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )}
                        
                    </Content>
                    <Footer style={styles.footer}></Footer>
                </Container>
            )
        }
        
    }
}

/**
* Function to map state to Component props.
**/
const mapStateToProps = (inState) => {
	return {
	    //serverConn : inState.serverState.connection
	};
};
  
//Export components.
export default connect(mapStateToProps)(Dash);