import React, {Component} from "react";
import { View, StyleSheet, Text, ScrollView, StatusBar, Dimensions, Alert, ActivityIndicator } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { Content, Container } from "native-base";
import { Card, Button, Input, Overlay } from "react-native-elements";
import Core from "../Core";
import Database from '../database';
import Orientation from "react-native-orientation";
const db = new Database();

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	
	title: {
		fontSize: 30,
	  	textAlign: 'center',
		  margin: 40,
		  color: '#F93106'
	},
	loader: {
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Register extends Component {
	static navigationOptions =  {
		title: 'Sign Up',
	};

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);

		this.state = {
			fName: '',
			lName: '',
			isVisible: false
		};
		StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
	} /* End constructor. */

	onChangeText  = (key, val) => {
		this.setState({ [key]: val });		
	}

   	onSubmit = (e) => {
		this.setState({ isVisible: true });
		var err = 0;
		if(this.state.fName == '' || this.state.lName == '') {
			this.loginErr();
		} else {			
			let name = this.state.fName+' '+this.state.lName;
			
			Core.io.emit("hasRegistered", name, 0);//use socket to send name to server
		}	
	}

	loginErr(){
		Alert.alert(
			'Login',
			'Invalid Firstname/Lastname!',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{cancelable: false}
		)
	}

	submitErr(title, msg){
		this.setState({ isVisible: false });
		Alert.alert(
			title,
			msg,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{cancelable: false}
		)
	}	

	componentDidMount() {
		Orientation.lockToPortrait();

		Core.io.on("userReg", (name, id) => {
			this.setState({ isVisible: false });
			let uData = [];

			uData['name'] = name;
			uData['socketId'] = id;

			//insert user
			db.addUser(uData).then((res) => {
				if(res.rowsAffected == 1){	
					//route to poll
					this.props.navigation.navigate('Poll'); 
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	}

	render() {
		
		return (
			<Container>		
				<Content padder>
					<ScrollView>
						<Text style={styles.title}>Register Your Names</Text>
						
						<Card>
                            <Input placeholder="Firstname" name="fName" onChangeText={val => this.onChangeText('fName', val)} />
                            <Input placeholder="Lastname" name="lName" onChangeText={val => this.onChangeText('lName', val)} />
                            <Button buttonStyle={{ marginTop: 20, backgroundColor: '#F93106'}} title="Register" onPress={(e) => { this.onSubmit(e);}}/>
                        </Card>
					</ScrollView>
				</Content>
				<Overlay isVisible={this.state.isVisible} overlayStyle={styles.loader}>
					<ActivityIndicator size="large"/>
				</Overlay>
			</Container>			
		)
			
	}
}