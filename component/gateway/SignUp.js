import React, {Component} from "react";
import { View, StyleSheet, Text, ScrollView, StatusBar, Dimensions, Alert, ActivityIndicator } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { Body, Content, Container, Item, Picker, ListItem, Radio, Right, Left } from "native-base";
import { Card, Button, Input, Overlay, CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import axios from 'axios';
import Database from '../../database';
import Orientation from "react-native-orientation";
const db = new Database();

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	row: {
		flex: 1,
    	flexDirection: 'row',
		justifyContent: 'space-between',
		
	},
	button: {
		width: '48%',
		marginTop: 20,
	},
	loader: {
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
	header: {
		backgroundColor: '#F93106',
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 30,
	  	textAlign: 'center',
		  margin: 40,
		  color: '#F93106'
	},
	subTitle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 20,
		color: '#767576'
	},
	loginSect: {
		marginTop: 40,
	},
	loginTxt: {
		textAlign: 'center',
		color: '#D5D3D6',
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		height: height / 4,
	},
	imgBack: {   
		width: width - 200,
		height: height / 4,
		marginTop: height / 4,
		alignItems: 'center',
		resizeMode: 'contain'
	},
	lottie: {
		width: 100,
		height: 100
	},
	pass: {
		width: '70%'
	}
});

class SignUp extends Component {
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
			oName: '',
			stateId: undefined,
			deptId: undefined,
			gender: '',
			phone: '',
			email: '',
			polyId: undefined,
			uniId: undefined,
			formError: '',
			isVisible: false,
			nameVisible: true,
			phoneAddVisible: false,
			stateVisible: false,
			subjVisible: false,
			subj1: 1,
			subj2: undefined,
			subj3: undefined,
			subj4: undefined,
		};
		StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
	} /* End constructor. */

	onChangeText  = (key, val) => {
		if(key == 'subj4'){
            if(val == this.state.subj2 || val == this.state.subj3) {
                alert('Please dont select same subject twice');
            } else {
                this.setState({[key]: val});
            }
        } else if(key == 'subj2') {
            if(val == this.state.subj3 || val == this.state.subj4) {
                alert('Please dont select same subject twice');
            } else {
                this.setState({[key]: val});
            }
        } else if(key == 'subj3'){
            if(val == this.state.subj4 || val == this.state.subj2) {
                alert('Please dont select same subject twice');
            } else {
                this.setState({[key]: val});
            }
        } else {
			this.setState({ [key]: val })
		}
		
	}

	handlePass = (text) => {
		this.setState({ pass: text })
	}

   	onSubmit = (e) => {
		this.setState({ isVisible: true });
		var err = 0;

		if(this.state.fName == '' ||this.state.lName == '' || this.state.email == '' || this.state.phone == '' || this.state.gender == '' || this.state.stateId == undefined || this.state.deptId == undefined || this.state.polyId == undefined || this.state.uniId == undefined || this.state.subj1 == undefined || this.state.subj2 == undefined || this.state.subj3 == undefined || this.state.subj4 == undefined) {
			err = 1;
		} 

		if(err == 1){
			this.submitErr('Registration Error', 'All fields except "othername" are required!');
		} else {
			//console.log(this.state.fName.trim(), this.state.lName.trim(), this.state.oName.trim(), this.state.phone.trim(), this.state.email.trim(), parseInt(this.state.stateId), parseInt(this.state.uniId), parseInt(this.state.polyId), parseInt(this.state.deptId), this.state.gender.trim(), this.state.subj1, parseInt(this.state.subj2), parseInt(this.state.subj3), parseInt(this.state.subj4));
			//const uniqueId = DeviceInfo.getUniqueID();
			axios.post('https://20503a5c.ngrok.io/api/register', { 
				firstname: this.state.fName.trim(),
				lastname: this.state.lName.trim(),
				oName: this.state.oName.trim(),
				phone: this.state.phone.trim(),
				email: this.state.email.trim(),
				state_id: this.state.stateId.trim(),
				university_id: this.state.uniId.trim(),
				polytechnic_id: this.state.polyId.trim(),
				department_id: this.state.deptId.trim(),
				gender: this.state.gender.trim(),
				firstSubj: this.state.subj1,
				secondSubj: this.state.subj2,
				thirdSubj: this.state.subj3,
				fourthSubj: this.state.subj4, 
			}).then(res => {
				if(res.status == 200){
					let uData = [];
					let uSubjReg = [];
					let uActivities = [];
					
					uData['fName'] = res.data.user.firstname;
					uData['lName'] = res.data.user.lastname;
					uData['phone'] = res.data.user.phone;
					uData['gender'] = res.data.user.gender;
					uData['email'] = res.data.user.email;
					uData['stateId'] = res.data.user.state_id;
					uData['polyId'] = res.data.user.polytechnic_id;
					uData['univId'] = res.data.user.university_id;
					uData['deptId'] = res.data.user.department_id;
					uData['regNum'] = res.data.user.regNum;
					uData['dateReg'] = res.data.user.dateReg;
					uData['img'] = res.data.user.img;
					uData['tca'] = res.data.user.totalCoinsAccrued;
					uData['tcc'] = res.data.user.totalCurrentCoin;
					uData['oName'] = res.data.user.othername;
					uData['id'] = res.data.user.id;
					uData['accessToken'] = res.data.access_token;

					uSubjReg = res.data.user.subjects;
					uActivities = res.data.user.activities;

					let polyId = res.data.user.poly.id;
					let poly = res.data.user.poly.poly;
					let uniId = res.data.user.uni.id;
					let uni = res.data.user.uni.univ;
					let stateId = res.data.user.state.id;
					let state = res.data.user.state.state;
					let deptId = res.data.user.department.id;
					let dept = res.data.user.department.dept;

					//insert user
					db.addUser(uData).then((res) => {
						if(res.rowsAffected == 1){
							//insert Activities
							let actLen = uActivities.length;
							for(let j = 0; j < actLen; j++){
								let tmpAct = uActivities[j];

								db.addUserActivities(tmpAct).then((res6) => {
									if(res6.rowsAffected == 1){
										console.log('inserted an activity');										
									}
								}).catch((err) => {
									console.log(err);
								});
							}
							
							//insert state
							db.addUserState(state, stateId).then((res2) => {
								if(res2.rowsAffected == 1){
									console.log('inserted a state');										
								}
							}).catch((err) => {
								console.log(err);
							});

							//insert university
							db.addUserUni(uni, uniId).then((res3) => {
								if(res3.rowsAffected == 1){
									console.log('inserted a uni');										
								}
							}).catch((err) => {
								console.log(err);
							})

							//insert poly
							db.addUserPoly(poly, polyId).then((res4) => {
								if(res4.rowsAffected == 1){
									console.log('inserted a poly');										
								}
							}).catch((err) => {
								console.log(err);
							})

							//insert dept
							db.addUserDept(dept, deptId).then((res5) => {
								if(res5.rowsAffected == 1){
									console.log('inserted a dept');	
									this.setState({ isVisible: false });
									this.props.navigation.navigate('Dash');									
								}
							}).catch((err) => {
								console.log(err);
							})

							let subjDone = false;
							let topicDone = false;
							let objDone = false;
							let quesDone = false;
							//insert userSubjects
							for(let i = 0; i < 4; i++){
								
								let tmpSbjreg = uSubjReg[i];

								db.addUserSubj(tmpSbjreg).then((res1) => {
									if(res1.rowsAffected == 1){
										console.log('inserted a subject');										
									}
								}).catch((err) => {
									console.log(err);
								});

								//GET topics and objectives in topic
								let subjId = uSubjReg[i]['subject_id'];
								
								if(i == 3){
									subjDone = true;
								}

								axios.get('https://20503a5c.ngrok.io/api/getTopicsInSubject/'+subjId, {})
								.then(res => {
									
									
									let k, topic = res.data, topicLen = topic.length;
									if(topicLen > 0){
										for(k = 0; k < topicLen; k++){
											if(subjDone == true && k == (topicLen - 1)){
												topicDone = true;
											}
											let topicId = topic[k]['id'];
											let topicName = topic[k]['topic'];
											let subjId = topic[k]['subject_id'];

											db.addUserTopic(topicId, topicName, subjId).then((rest) => {
												if(rest.rowsAffected == 1){
													console.log('inserted a topic');										
												}
												
											}).catch((err) => {
												console.log(err);
											});


											let topicObj = topic[k]['objectives'];
											let topicObjLen  = topicObj.length;
											let l;

											for(l = 0; l < topicObjLen; l++){
												if(subjDone == true && topicDone == true && l == (topicObjLen - 1)){
													objDone = true;
												}
												let obj = topicObj[l];

												db.addUserObj(obj).then((rest) => {
													if(rest.rowsAffected == 1){
														console.log('inserted an Objective');										
													}
												}).catch((err) => {
													console.log(err);
												});

												//TODO: get Question from server where questions.objectives_id = obj.id
												axios.get('https://20503a5c.ngrok.io/api/getQuestionsInObjective/'+obj.id, {})
												.then(res => {
													let o, ques = res.data, quesLen = ques.length;
													if(quesLen > 0){
														for(o = 0; o < quesLen; o++){
															let qs = ques[o];
															db.addUserQuestion(qs, topicId).then((rest1) => {
																if(rest1.rowsAffected == 1){
																	console.log('inserted a Question');
																	if(subjDone == true && topicDone == true && objDone == true && o == quesLen){
																		quesDone = true;
																	}
																	
																	if(subjDone && topicDone && objDone && quesDone){
																		this.setState({ isVisible: false });
																		this.props.navigation.navigate('Dash');
																	}																	
																	
																} 
															}).catch((err) => {
																console.log(err);
															});
														}
													}
												})
												.catch((error) => {
													console.log(error)
												});
											}
										}
									}
								})
								.catch((error) => {
									console.log(error)
								});
							}					

						}
					}).catch((err) => {
						console.log(err);
					})
				}
				
			}).catch((error) => {
				console.log(error)
			});
						
		}		
	}
	
	login(){
		this.setState({ isVisible: false });
		//this.props.navigation.navigate('liveVOD');
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

	toPhoneAdd = () => {
		this.setState({ 
			nameVisible: false,
			phoneAddVisible: true,
			stateVisible: false,
			subjVisible: false
		});
	}

	toName = () => {
		this.setState({ 
			nameVisible: true,
			phoneAddVisible: false,
			stateVisible: false,
			subjVisible: false
		});
	}

	toState = () => {
		this.setState({ 
			nameVisible: false,
			phoneAddVisible: false,
			stateVisible: true,
			subjVisible: false
		});
	}

	toSubj = () => {
		this.setState({ 
			nameVisible: false,
			phoneAddVisible: false,
			stateVisible: false,
			subjVisible: true
		});
	}

	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render() {
		let viewFormSection;
		const { navigate } = this.props.navigation;
		const { pass } = this.state;

		if(this.state.nameVisible == true && this.state.phoneAddVisible == false && this.state.stateVisible == false && this.state.subjVisible == false){
			viewFormSection = 	<View>
									<Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Firstname" name="fName" value={this.state.fName} onChangeText={val => this.onChangeText('fName', val)} />
									<Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Othername" name="oName" value={this.state.oName} onChangeText={val => this.onChangeText('oName', val)} />
									<Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Lastname" name="lName" value={this.state.lName} onChangeText={val => this.onChangeText('lName', val)} />
									
									<Button buttonStyle={{ marginTop: 10, backgroundColor: '#F93106'}} title="Next" onPress={() => { this.toPhoneAdd();}}/>
								</View>
		} else if(this.state.nameVisible == false && this.state.phoneAddVisible == true && this.state.stateVisible == false && this.state.subjVisible == false) {
			viewFormSection = 	<View>
									<Input containerStyle={{paddingLeft: 0, paddingRight: 0}} keyboardType={'numeric'} value={this.state.phone} placeholder="Phone Number" name="phone" onChangeText={val => this.onChangeText('phone', val)} />
									<Input containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Email" value={this.state.email} name="Email" onChangeText={val => this.onChangeText('email', val)} />
									
									<Item>
										<Left>
											<Text>Gender</Text>
										</Left>
										<Body>
											<CheckBox
												center
												title='M'
												checkedIcon='dot-circle-o'
												uncheckedIcon='circle-o'
												checked={this.state.gender == 'M' ? true: false}
												onPress={val => this.onChangeText('gender', 'M')}
											/>
										</Body>
										<Right>
											<CheckBox
												center
												title='F'
												checkedIcon='dot-circle-o'
												uncheckedIcon='circle-o'
												checked={this.state.gender == 'F' ? true: false}
												onPress={val => this.onChangeText('gender', 'F')}
											/>
										</Right>
									</Item>
																		
									<View style={styles.row}>
										<View style={styles.button}>
											<Button buttonStyle={{ backgroundColor: '#000000'}} title="Back" onPress={() => { this.toName();}}/>
										</View>
										<View style={styles.button}>
											<Button buttonStyle={{ backgroundColor: '#F93106'}} title="Next" onPress={() => { this.toState();}}/>
										</View>
										
									</View>									
								</View>
		} else if(this.state.nameVisible == false && this.state.phoneAddVisible == false && this.state.stateVisible == true && this.state.subjVisible == false) {
			viewFormSection = 	<View>
									<Item picker>
										<Picker
											mode="dropdown"
											placeholder="Select your State"
											placeholderStyle={{ color: "#bfc6ea" }}
											placeholderIconColor="#007aff"
											style={{ width: undefined }}
											selectedValue={this.state.stateId}
											onValueChange={val => this.onChangeText('stateId', val)}>
											<Picker.Item label="Select your State" value="-" />
											<Picker.Item label="Anambra" value="1" />
											<Picker.Item label="Enugu" value="2" />											
										</Picker>
									</Item>
									<Item picker>
										<Picker
											mode="dropdown"
											placeholder="Select your Department"
											placeholderStyle={{ color: "#bfc6ea" }}
											placeholderIconColor="#007aff"
											style={{ width: undefined }}
											selectedValue={this.state.deptId}
											onValueChange={val => this.onChangeText('deptId', val)}>
											<Picker.Item label="Select your Department" value="-" />
											<Picker.Item label="Computer Science" value="1" />
											<Picker.Item label="Mechanical Engineering" value="2" />
										</Picker>
									</Item>
									<Item picker>
										<Picker
											mode="dropdown"
											placeholder="Select your Polytechnic"
											placeholderStyle={{ color: "#bfc6ea" }}
											placeholderIconColor="#007aff"
											style={{ width: undefined }}
											selectedValue={this.state.polyId}
											onValueChange={val => this.onChangeText('polyId', val)}>
											<Picker.Item label="Select your Polytechnic" value="-" />
											<Picker.Item label="Fed Poly Oko" value="1" />
											<Picker.Item label="Fed Poly Nekede" value="2" />
										</Picker>
									</Item>
									<Item picker>
										<Picker
											mode="dropdown"
											placeholder="Select your University"
											placeholderStyle={{ color: "#bfc6ea" }}
											placeholderIconColor="#007aff"
											style={{ width: undefined }}
											selectedValue={this.state.uniId}
											onValueChange={val => this.onChangeText('uniId', val)}>
											<Picker.Item label="Select your University" value="-" />
											<Picker.Item label="NAU" value="1" />
											<Picker.Item label="UNN" value="2" />
										</Picker>
									</Item>
									<View style={styles.row}>
										<View style={styles.button}>
											<Button buttonStyle={{ backgroundColor:"#000000"}} title="Back" onPress={() => { this.toPhoneAdd();}}/>
										</View>
										<View style={styles.button}>
											<Button buttonStyle={{ backgroundColor:"#F93106"}} title="Next"
												//onPress={() => { onSignIn().then(() => navigate("SignedIn"));}}
												onPress={() => { this.toSubj();}}
											/>
										</View>
										
									</View>									
									
								</View>
		} else if(this.state.nameVisible == false && this.state.phoneAddVisible == false && this.state.stateVisible == false && this.state.subjVisible == true){
			viewFormSection = 	<View>
				<Item picker>
					<Picker
						mode="dropdown"
						placeholder="First Subject"
						placeholderStyle={{ color: "#bfc6ea" }}
						placeholderIconColor="#007aff"
						style={{ width: undefined }}
						selectedValue={this.state.subj1}
						onValueChange={val => this.onChangeText('subj1', val)}>
						<Picker.Item label="Use Of English" value="1" />
					</Picker>
				</Item>
				<Item picker>
					<Picker
						mode="dropdown"
						placeholder="Select your Second Subject"
						placeholderStyle={{ color: "#bfc6ea" }}
						placeholderIconColor="#007aff"
						style={{ width: undefined }}
						selectedValue={this.state.subj2}
						onValueChange={val => this.onChangeText('subj2', val)}>
						<Picker.Item label="Select your Second Subject" value="-" />
						<Picker.Item label="Chemistry" value="4" />
						<Picker.Item label="Mathematics" value="10" />
						<Picker.Item label="Physics" value="11" />
					</Picker>
				</Item>
				<Item picker>
					<Picker
						mode="dropdown"
						placeholder="Select your Third Subject"
						placeholderStyle={{ color: "#bfc6ea" }}
						placeholderIconColor="#007aff"
						style={{ width: undefined }}
						selectedValue={this.state.subj3}
						onValueChange={val => this.onChangeText('subj3', val)}>
						<Picker.Item label="Select your Third Subject" value="-"/>
						<Picker.Item label="Chemistry" value="4" />
						<Picker.Item label="Mathematics" value="10" />
						<Picker.Item label="Physics" value="11" />
					</Picker>
				</Item>
				<Item picker>
					<Picker
						mode="dropdown"
						placeholder="Select your Fourth Subject"
						placeholderStyle={{ color: "#bfc6ea" }}
						placeholderIconColor="#007aff"
						style={{ width: undefined }}
						selectedValue={this.state.subj4}
						onValueChange={val => this.onChangeText('subj4', val)}>
						<Picker.Item label="Select your Fourth Subject" value="-" />
						<Picker.Item label="Chemistry" value="4" />
						<Picker.Item label="Mathematics" value="10" />
						<Picker.Item label="Physics" value="11" />
					</Picker>
				</Item>

				<View style={styles.row}>
					<View style={styles.button}>
						<Button buttonStyle={{ backgroundColor:"#000000"}} title="Back" onPress={() => { this.toState();}}/>
					</View>
					<View style={styles.button}>
						<Button buttonStyle={{ backgroundColor:"#F93106"}} title="Sign Up"
							//onPress={() => { onSignIn().then(() => navigate("SignedIn"));}}
							onPress={() => { this.onSubmit();}}
						/>
					</View>
					
				</View>	
			</View>
		}
		
		return (
			<Container>						
				
				<Content padder>
					<ScrollView>
						<Text style={styles.title}>PREP50</Text>
						
						<Card style={styles.card}>
							<Text style={styles.subTitle}>Create Account</Text>

							{viewFormSection}								
							
							<View style={styles.loginSect}>
								<Text style={styles.loginTxt}>Already have an account?</Text>
								<Button type="clear" title="Sign In" onPress={() => navigate("SignIn")}/>
							</View>
							
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

/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
	return {
	  serverConn : inState.serverState.connection,
	};
}; 
  
// Export components.
export default connect(mapStateToProps)(SignUp);