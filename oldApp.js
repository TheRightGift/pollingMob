import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from './component/Loading';
import Register from './component/Register';
import Poll from './component/Poll';
import { Root } from "native-base";

const AppStack = createStackNavigator({ 
	Register: { screen: Register},
	Poll: { screen: Poll},
	/*SubjDash: {screen: SubjDash},
	Question: {screen: Question},
	UserDash: {screen: UserDash},
	Subscription: {screen: Subscription},*/
},
{
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
});

/*const AuthStack = createStackNavigator({ 
	SignIn: { screen: SignIn },
	SignUp: { screen: SignUp }	 
},
{
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
});*/

const navStack = createSwitchNavigator(
	{
	  Loading,
	  AppStack,
	  //AuthStack
	},
	{
	  initialRouteName: 'Loading',
	}
);

let Nav = createAppContainer(navStack);

export default class App extends React.Component {
	render() {
		return (
			<Root>
				<Nav/>
			</Root>
							
		);
	}
}