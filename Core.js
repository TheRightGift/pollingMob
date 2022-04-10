import io from "socket.io-client";
import Database from './database';
//import RNRestart from 'react-native-restart';
const db = new Database();



const Core = {
    // Our Socket.io connection to the server.
    io : null,
    appServerURL : "http://192.168.43.231:8000",
    startup : () => {
		//initialize Db 
		db.initDB();

		//establish connection to server
		Core.io = io("http://192.168.43.231:8000");

		Core.io.on("connected", function(){
			//get Connection status.
			console.log('here')
		});

		Core.io.on('connect_failed', function(){
		    store.dispatch(connectionStatus(false));
		});
    
    	Core.io.on("disconnected", function(){
			//get Connection status.
      		store.dispatch(connectionStatus(false));
		});

		Core.io.on("wow", function(){
			console.log('wow');
		});

		//Core.io.on("userRegistered", Core.saveUserData);

		Core.io.on("navToForgotPass", Core.navToForgotPass);

		//Core.io.on("loginSuccess", Core.loginSuccess);

		Core.io.on("loginErrorr", Core.loginError);
		Core.io.on("liveTvUpdate", Core.liveTvUpdate);
		Core.io.on("userLogout", Core.userLogout);
		//Core.io.on("getPaymentHistory", Core.addPayment)
	},
	/*addPayment: () => {

	},
	userLogout: () => {
		//empty user table
		db.emptyUserTb().then((data) => {
			if (data) {			
				//reset store
				store.dispatch(checkedSignedInStatus(true));
				store.dispatch(signedInStatus(false));
				store.dispatch(clearOnTvData());
				//TODO: reset liveTv and VOD
				//restart app
				//RNRestart.Restart();
			} 
		}).catch((err) => {
			console.log(err);
		})		
	},
	getLiveTv: function(){
		db.listTvProg().then((res) => {
			//this.setState({ checkedSignIn: false });
			//store.dispatch(checkedSignedInStatus(false));

			store.dispatch(setOnTvData(res));
			console.log(res)	
		}).catch((err) => {
			console.log(err);
		})
	},
	emptyLiveTvRedux: () => {
		store.dispatch(clearOnTvData());
	},
	liveTvUpdate: function(data){
		if(data){
			let a, dataLen = data.length;
			for(a = 0, a < dataLen; a++;){
				db.updateLiveTv(data[a]).then((result) => {
					console.log(result);
				}).catch((err) => {
					console.log(err);
				})	

				if(a == (dataLen - 1)){
					Core.emptyLiveTvRedux();//empty live tv data in store

					Core.getLiveTv();//repopulate liveTv data in store
				}
			}
		}
	},
	saveUserData: function(data){
		//console.log(data)		
		id = 1;
		fName = data.newData.fName;
		sName = data.newData.lName;
		oName = data.newData.oName;
		phone = data.newData.phone;
		add = data.newData.add;
		pass = data.newData.pass;
		uName = data.newData.uName;
		mac = data.newData.mac;		
		var date = new Date();

		let userData = {
			id: id,
			fName: fName,
			lName: sName,
			oName: oName,
			uName: uName,
			pass: pass,
			date: date,	
			phone: phone,
			add: add,
			mac: mac,		
		}
		//store value in sqliteDB
		db.addUser(userData).then((result) => {
			console.log(result);
			//insertId = result.insertId
			//this.props.navigation.state.params.onNavigateBack;
			//this.props.navigation.goBack();
		}).catch((err) => {
			console.log(err);
		})		
	},
	navToForgotPass: function(){
		
		store.dispatch(forgotPasswordStatus(true));
		//this.props.navigation.state.params.onNavigateBack;
		//this.props.navigation.navigate('SignIn');
	},
	loginSuccess: function(data){
		//console.log(data['mUser']);
		if(data){
			id = 1;
			fName = data['mUser']['firstname'];
			sName = data['mUser']['lastname'];
			oName = data['mUser']['othername'];
			phone = data['mUser']['phone'];
			add = data['mUser']['add'];
			pass = data['mUser']['password'];
			uName = data['mUser']['username'];
			mac = data['mUser']['macAddress'];	
			date = data['mUser']['date'];
			let userData = {
				id: id,
				fName: fName,
				lName: sName,
				oName: oName,
				uName: uName,
				pass: pass,
				date: date,	
				phone: phone,
				add: add,
				mac: mac,			
			}
			//store value in sqliteDB
			db.addUser(userData).then((result) => {
				
				if(result.rowsAffected == 1){
					console.log('row affected')
					//store.dispatch(signedInStatus(true));
					//return store.getState().navigationState.signedIn;
					store.dispatch(NavigationActions.navigate({ routeName: 'signedIn' }));
				}
				
			}).catch((err) => {
				console.log(err);
			})	
		} else {
			console.log('loading data');
		}
	},
	loginError: () => {
		//store.dispatch(signedInStatus(true));
		//return store.getState().navigationState.signedIn;
	},*/
	dbSuccess : function(tx, res){
		console.log('success: '+res);
	},
	dbError : function(tx, err){
		console.log('DB error occurred: '+ err);
	}

}

export default Core;