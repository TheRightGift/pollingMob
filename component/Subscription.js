import React, {Component} from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions, StatusBar,  } from "react-native";
import { Content, Container, Item, Picker, Icon, Toast, Header, Title, Tabs, Tab, TabHeading, Right, Body } from "native-base";
import { Card, Button, Input,  Overlay } from "react-native-elements";
import RNPaystack from 'react-native-paystack';
import axios from 'axios';
import Database from '../database';
import Orientation from "react-native-orientation";
const db = new Database();

let { width, height } = Dimensions.get('window');

RNPaystack.init({ publicKey: 'pk_live_47b1bdd7b15605dfedfd8f4d3ccaf3edbc1a53f5' });

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F93106',
	},
	container: {
	  flex: 1,
	  flexDirection: "column",
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	  color: '#333333',
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  height: height / 4,
	},
	imgBack: {   
		width: width - 200,
		height: height / 4,
		alignItems: 'center',
		marginTop: height / 4,
		resizeMode: 'contain'
	},
	title: {
		fontSize: 30,
	  	textAlign: 'center',
		  margin: 30,
		  color: '#F93106'
	},
	subTitle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 20,
		color: '#767576'
	},
	regSect: {
		marginTop: 40,
	},
	regTxt: {
		textAlign: 'center',
		color: '#D5D3D6',
	},
	loader: {
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Subscription extends Component {
    /**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            expiryMonth: '',
            expiryYear: '',
            cName: '',
            cNum: '',
            email: '',
            cvc: '',
            isVisible: false,
            showToast: false,
            sPin: ''
		};
		StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */
    
    componentDidMount() {
		Orientation.lockToPortrait();
		
    }; /* End componentDidMount(). */

    onChangeText  = (key, val) => {
		this.setState({ [key]: val })
	}
    
    onSubscribe = (e) => {
		this.setState({ isVisible: true });
        e.preventDefault();
        
        let cName = this.state.cName;
        let cNum = this.state.cNum;
        let expiryMonth = this.state.expiryMonth;
        let expiryYear = this.state.expiryYear;
        let email = this.state.email;
        let cvc = this.state.cvc;

        if(cName != "" && cNum != "" && expiryMonth != "" && expiryYear != "" && email != "" && cvc  != ""){
            this.setState({ isVisible: false });
            console.log(cName, cNum, expiryMonth, expiryYear, email, cvc);

            RNPaystack.chargeCard({
                cardNumber: cNum, 
                expiryMonth: expiryMonth, 
                expiryYear: expiryYear, 
                cvc: cvc,
                email: email,
                amountInKobo: 150000,
            }).then(response => {
                console.log(response); // card charged successfully, get reference here
            }).catch(error => {
                console.log(error); // error is a javascript Error object
                console.log(error.message);
                console.log(error.code);

                Toast.show({
                    text: error.message,
                    buttonText: "Okay",
                    type: "danger",
                    duration: 6000
                })
            })
        } else {
            this.setState({ isVisible: false });
            Toast.show({
                text: "Please ensure you fill every field.",
                buttonText: "Okay",
                type: "warning",
                duration: 6000
            })
        }
        
    }

    onPinSubscribe = (e) => {
        this.setState({ isVisible: true });
        e.preventDefault();
        
        let sPin = this.state.sPin;

        if(sPin != ''){
            axios.post('https://20503a5c.ngrok.io/api/pinSubscription', { sPin: sPin })
            .then(res => {
				
                if(res.data.message == undefined){
                    //TODO: if success update all activities.active to Y in server DB
                                     //update all activities.active to Y in app DB
                                     //send User to dash
                } else {
					this.setState({ isVisible: false });
					alert(res.data.message);                    
                }
            }).catch((error) => {
                console.log(error)
            });
        } else {
            this.setState({ isVisible: false });
            Toast.show({
                text: "Please ensure you enter a correct/unused PREP50 Subscription PIN.",
                buttonText: "Okay",
                type: "warning",
                duration: 6000
            })
        }
    }
    
    render() {
        return (
            <Container>						
				<Header hasTabs style={styles.header}>
                    <Body>
                        <Title>PREP50 Subscription</Title>
                    </Body>
                </Header>
                <Tabs>
                    <Tab heading="Card">
                        <Card>
                            
                            <Text>Pay with your ATM card the sum of N1,500 to have access to PREP50's full features. The security of your card details is assured by our partnership with PAYSTACK.</Text>
                            <Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Name on Card" name="cName" value={this.state.cName} onChangeText={val => this.onChangeText('cName', val)} />
                            <Input containerStyle={{paddingLeft: 0, paddingRight: 0}} keyboardType={'numeric'} placeholder="Card Number" name="cNum" value={this.state.cNum} onChangeText={val => this.onChangeText('cNum', val)} />
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Expiry Month"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.expiryMonth}
                                    onValueChange={val => this.onChangeText('expiryMonth', val)}
                                >
                                    <Picker.Item label="Expiry Month" value="" />
                                    <Picker.Item label="JAN" value="1" />
                                    <Picker.Item label="FEB" value="2" />
                                    <Picker.Item label="MAR" value="3" />
                                    <Picker.Item label="APR" value="4" />
                                    <Picker.Item label="MAY" value="5" />
                                    <Picker.Item label="JUN" value="6" />
                                    <Picker.Item label="JUL" value="7" />
                                    <Picker.Item label="AUG" value="8" />
                                    <Picker.Item label="SEP" value="1" />
                                    <Picker.Item label="OCT" value="10" />
                                    <Picker.Item label="NOV" value="11" />
                                    <Picker.Item label="DEC" value="12" />
                                </Picker>

                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Expiry Year"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.expiryYear}
                                    onValueChange={val => this.onChangeText('expiryYear', val)}
                                >
                                    <Picker.Item label="Expiry Year" value="" />
                                    <Picker.Item label="2020" value="20" />
                                    <Picker.Item label="2021" value="21" />
                                    <Picker.Item label="2022" value="22" />
                                    <Picker.Item label="2023" value="23" />
                                    <Picker.Item label="2024" value="24" />
                                    <Picker.Item label="2025" value="25" />
                                </Picker>
                            </Item>
                            <Input containerStyle={{paddingLeft: 0, paddingRight: 0}} keyboardType={'numeric'} placeholder="CVV" name="cvc" value={this.state.cvc} onChangeText={val => this.onChangeText('cvc', val)} />
                            <Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Email" value={this.state.email} name="Email" onChangeText={val => this.onChangeText('email', val)} />
                            <Button buttonStyle={{ marginTop: 20, backgroundColor: '#F93106'}} title="Subscribe" onPress={(e) => { this.onSubscribe(e);}}/>
                        </Card>
                    </Tab>
                    <Tab heading="PIN">
                    <Card>
                            
                            <Text>Pay with PREP50 Subscription PIN worth the sum of N1,500 to have access to PREP50's full features. Contact PREP50 staff/Agent for this PIN.</Text>
                            <Input containerStyle={{paddingLeft: 0, paddingRight: 0}} keyboardType={'numeric'} placeholder="Subscription PIN" name="sPin" value={this.state.sPin} onChangeText={val => this.onChangeText('sPin', val)} />
                            
                            <Button buttonStyle={{ marginTop: 20, backgroundColor: '#F93106'}} title="Subscribe" onPress={(e) => { this.onPinSubscribe(e)}}/>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}