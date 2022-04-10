import React, {useEffect} from 'react'
import {StyleSheet, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AnimatedLoader from "react-native-animated-loader";
import Core from "../Core";
import Database from '../database';
const db = new Database();

export default class Loading extends React.Component {
	constructor(inProps) {
        super(inProps);
		this.state = {
			loader: true
        };	
        Core.startup();
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */
    
	componentDidMount() {
        //Core.io.on("connected", function(){
            setTimeout(() => {
                db.getUser().then((data) => {
                    let len = data.length;
                    
                    if (len < 1) {		
                        this.loggedOut();
                    } else {
                        this.loggedIn();					
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }, 1500);
        //});    
        
        Core.io.on("disconnected", function(){
			alert('Disconnected from server');
		});
        
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    loggedOut = () => {
        this.props.navigation.navigate('Register');        
    }

    loggedIn = () => {
        this.props.navigation.navigate('Poll');      	
    }

	render() {
        const { loader} = this.state;
		return(
            <AnimatedLoader
                visible={loader}
                overlayColor="#FFFFFF"
                animationStyle={styles.lottie}
                speed={1}
                source={require("../data.json")}
            />
        );
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottie: {
        width: 100,
        height: 100
    }
})
