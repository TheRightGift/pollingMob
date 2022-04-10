import React, {Component} from "react";
import { View, StyleSheet, Text, ScrollView, StatusBar, Dimensions, Image, ProgressBarAndroid } from "react-native";
import { Content, Container, Card, CardItem, Left, Body, Icon, Button } from "native-base";
import {Overlay } from "react-native-elements";
let { width, height } = Dimensions.get('window');
import Core from "../Core";
import Database from '../database';
import Orientation from "react-native-orientation";
const db = new Database();

const styles = StyleSheet.create({
	
	title: {
		fontSize: 25,
	  	textAlign: 'center',
        marginTop: 20
	},
	loader: {
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width
    },
    card: {
        height: height / 2,
        width: width
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
    },
});

export default class Poll extends Component {

    constructor(inProps) {

		super(inProps);

		this.state = {
            userId: '',
			votedUserArr: []
		};
		StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
	} /* End constructor. */

    onSubmit = (e, tag) => {	
        db.getUser().then((data) => {
            let userId = data[0]['socketId'];
            this.setState({ userId: userId });
            Core.io.emit('iVote', userId, tag);
        }).catch((err) => {
            console.log(err);
        })
    }
    
    componentDidMount() {
		Orientation.lockToPortrait();

		Core.io.on("usersVoted", (votedUserArr) => {
            this.setState({ votedUserArr: votedUserArr });
		});
	}

    render() {
        const { votedUserArr, userId } = this.state;
        
        let messiStat, ronaldoStat, messiProg, ronaldoProg;
		let messiVote = 0;
        let ronaldoVote = 0;
        let votedUserArrLen = votedUserArr.length;
        let a, found = 0, myVote = "";
        console.log(votedUserArr)
        for(a = 0; a < votedUserArrLen; a++){
            if(votedUserArr[a][0] == userId){
                found = 1;
                if(votedUserArr[a][1] == 'M'){
                    myVote = 'M';
                } else if(votedUserArr[a][1] == 'C'){
                    myVote = 'C';
                }
            }

            if(votedUserArr[a][1] == 'M'){
                messiVote++;
            } else if(votedUserArr[a][1] == 'C') {
                ronaldoVote++;
            }
        }

        if(votedUserArrLen == 0 || found == 0){
            messiStat = <Text>You are yet to register your opinion. You need to register to view the statistics of the poll</Text>
            ronaldoStat = <Text>You are yet to register your opinion. You need to register to view the statistics of the poll</Text>
        } else {
            let perc = (messiVote / votedUserArrLen) * 100;
            
            if(messiVote == 1 && myVote == 'M'){
                messiStat = <Text>(1 vote) You picked Lionel Messi as the GOAT ({perc}%)')</Text>
            } else if(messiVote > 1 && myVote == 'M') {                
                messiVote = messiVote - 1;                
                messiStat = <Text>You and {messiVote} out of {votedUserArrLen} picked Lionel Messi as the GOAT ({perc}%)</Text>
            } else {
                messiStat = <Text>{messiVote} out of {votedUserArrLen} picked Lionel Messi as the GOAT ({perc}%)</Text>
            }
    
            let percR = (ronaldoVote / votedUserArrLen) * 100;
            if(ronaldoVote == 1 && myVote == 'C'){
                ronaldoStat = <Text>(1 vote) You picked Christiano Ronaldo as the GOAT ({percR}%)</Text>
            } else if(ronaldoVote > 1 && myVote == 'C') {                
                ronaldoVote = ronaldoVote - 1;                
                ronaldoStat = <Text>You and {ronaldoVote} out of {votedUserArrLen} picked Christiano Ronaldo as the GOAT ({percR}%)</Text>
            } else {
                ronaldoStat = <Text>{ronaldoVote} out of {votedUserArrLen} picked Christiano Ronaldo as the GOAT ({percR}%)</Text>
            }

            messiProg = <View style={styles.container}> 
                                <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={messiVote / votedUserArrLen}
                                />
                            </View> 
            
            ronaldoProg = <View style={styles.container}> 
                                <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={ronaldoVote / votedUserArrLen}
                                />
                            </View> 
    
        }
		return (
			<Container>		
				<Content>
                    <Text style={styles.title}>Who is the Greatest Of All Times (GOAT)?</Text>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Lionel Messi</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../img/messi.jpg')} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent onPress={(e) => { this.onSubmit(e, 'M');}}>
                                    <Icon active name="thumbs-up" />
                                    <Text> Vote Messi</Text>
                                </Button>
                            </Left>
                        </CardItem>
                        <CardItem>
                            {messiStat}
                        </CardItem>
                        <CardItem>
                            {messiProg}               
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Christiano Ronaldo</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../img/cRonaldo.jpg')} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent onPress={(e) => { this.onSubmit(e, 'C');}}>
                                    <Icon active name="thumbs-up" />
                                    <Text> Vote Ronaldo</Text>
                                </Button>
                            </Left>
                        </CardItem>
                        <CardItem>
                            {ronaldoStat}
                        </CardItem>
                        <CardItem>
                            {ronaldoProg}                            
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}