import React,{Component} from 'react';

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCzQ5jyXc0ecHQDibupmbnvJEJq2m8hrQg",
    authDomain: "fir-login-66fb2.firebaseapp.com",
    databaseURL: "https://fir-login-66fb2.firebaseio.com",
    projectId: "fir-login-66fb2",
    storageBucket: "fir-login-66fb2.appspot.com",
    messagingSenderId: "203826407125"
  };
  firebase.initializeApp(config);

class Authentication extends Component {

  login(event){
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);

    const auth=firebase.auth();
    const promise=auth.signInWithEmailAndPassword(email,password);

    promise
    .then(user =>{
      var lout=document.getElementById('logout');
      var err="Welcome "+email;
        this.setState({err:err});
      lout.classList.remove('hide');

    });
    promise.catch(e =>{
      var err=e.message;
      console.log(err);
      this.setState({err:err});
    });
  }

  logout(){
    const email=this.refs.email.value;
    firebase.auth().signOut();
    var lout=document.getElementById('logout');
    lout.classList.add('hide');
    var err="Thanks for loging "+email;
    this.setState({err:err});
  }

  signUp(){
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);

    const auth=firebase.auth();
    const promise=auth.createUserWithEmailAndPassword(email,password);
    promise
    .then(user =>{
      var err="Welcome "+email;
      firebase.database().ref("users/"+user.uid).set({
        email:email
      });
      console.log(user);
      this.setState({err:err});
    });
    promise
    .catch(e =>{
      var err =e.message;
      console.log(err);
      this.setState({err:err});
    });
  }

  google(){
    const email=this.refs.email.value;
    console.log("I am google method");
    var provider=new firebase.auth.GoogleAuthProvider();
     var promise=firebase.auth().signInWithPopup(provider);

     promise
     .then(result =>{
       var user=result.user;
       console.log(result);
       firebase.database().ref('users/'+user.uid).set({
         email:email,
         name:user.displayName
       });
     });

     promise
     .catch(e =>{
       var err =e.message;
       console.log(err);
       this.setState({err:err});
     });
  }

  constructor(props){
    super(props);

    this.state = {
      err:''
    };
    this.login=this.login.bind(this);
    this.signUp=this.signUp.bind(this);
    this.logout=this.logout.bind(this);
    this.google=this.google.bind(this);
  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="enter your email"/><br/>
        <input id="pass" ref="password" type="password" placeholder="enter your password"/><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Login</button>
        <button onClick={this.signUp}>Sign Up</button>
        <button  onClick={this.logout} id="logout" className="hide">Logout</button><br/>
        <button  onClick={this.google} id="google" className="google">Sign In with Google</button>

      </div>
    );
  }
}
export default Authentication;
