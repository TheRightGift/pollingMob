import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from './component/Loading';
import Register from './component/Register';
import Poll from './component/Poll';
import { Root } from "native-base";
import {  NodePlayerView } from 'react-native-nodemediaclient';



export default class App extends React.Component {
	render() {
		return (
			<NodePlayerView 
			style={{ height: 200 }}
			ref={(vp) => { this.vp = vp }}
			inputUrl={"rtmp://192.168.43.231:1935/live/"}
			scaleMode={"ScaleAspectFit"}
			bufferTime={300}
			maxBufferTime={1000}
			autoplay={true}
		  />
		);
	}
}