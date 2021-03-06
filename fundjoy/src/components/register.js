import React, { Component } from 'react';
import "../css/login.css"


const API_URL = 'http://localhost:9000/api/users';

class Register extends Component {
    constructor(){
        super();
        this.state = { 
            name: '',
            username: '',
            password: '',
            repeatPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }



    onRegisterClick(event){
        event.preventDefault();
        if(this.state.password !== this.state.repeatPassword){
            alert('Passwords should match');
            return;
        }
        let registerData = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            role: 1
        }
        fetch(API_URL, {
            method: 'POST', 
            body: JSON.stringify(registerData), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            if(response.message){
                console.log(response)
                alert(response.message);
                return;
            }else{
                this.setState({
                    repeatPassword: '',
                    username: '',
                    password: '',
                    name: '',
                 });
                
                
                console.log('User', JSON.stringify(response))
                this.props.history.push({pathname: "/login", state: {some: 'login'}});
            }
      
          })
          .catch(error => console.error('Error:', error));
       
    }

    goToLogin = ()=>{
        this.props.history.push({pathname: '/login', state: {some: 'login'}})
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    render() {
        return (

            <div className="container">

            <form className="form-signin" onSubmit={this.onRegisterClick}>
              <h2 className="form-signin-heading">Registration</h2>
              <label htmlFor="username" className="sr-only" >Email</label>
              <input type="text" id="username" className="form-control" name="username" placeholder="Email" minLength={2} maxLength={150} onChange={this.handleChange} required autoFocus/>
              <label htmlFor="name" className="sr-only">Your name</label>
              <input type="text" id="name" className="form-control" name="name" placeholder="Name" minLength={2} maxLength={150} onChange={this.handleChange} required/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="password" className="form-control" name="password" placeholder="Password" minLength={6} maxLength={20} /*pattern="^[0-9a-f]{24}$" title="Password should include one small and one capital letter, as well as a number"*/ onChange={this.handleChange} required/>
              <label htmlFor="repeatPassword" className="sr-only">Repeat Password</label>
              <input type="password" id="repeatPassword" className="form-control" name="repeatPassword" placeholder="Repeat Password" minLength={6} maxLength={20} /*pattern="^[0-9a-f]{24}$" title="Password should include one small and one capital letter, as well as a number"*/ onChange={this.handleChange} required/>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              <p className="text-center" style={{fontSize: '1.3em'}}><a href="#0" onClick={this.goToLogin}>Already have an account?</a></p>
            </form>
          </div>
        );
    }
}

export default Register;