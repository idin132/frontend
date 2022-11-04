import react, { Component } from 'react';
import Link from 'next/link'
import axios from 'axios';
import Cookies from 'universal-cookie';
import * as Endpoint from '../../service/Endpoint';
import 'bootstrap/dist/css/bootstrap.min.css'


const cookies = new Cookies();

const api = Endpoint.BASE_URL;
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            token: cookies.get('token'),

            go_home: true,
        }
    }


    handleInputChange(e) {
        const { name, value } = e.target
        // if (name == "fcmToken") {
        //     this.setState({ [name]: "12321232123213"})
        // } else {
        this.setState({ [name]: value })
        // }
    }

    doLogin() {
        const {
            username, password, token, go_home
        } = this.state
        // console.log(username, password, fcmToken)

        const parameter = {
            "username": username,
            "password": password,
            "token": cookies.get('token'),
                    }

        axios.post(Endpoint.LOGIN, parameter, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.data.status == 400) {
                alert(response.data.error)
            } else if (response.data.token) {
                axios.get(Endpoint.GET_USER, {
                    headers: {
                        'Authorization': response.data.token
                    }
                }).then(response2 => {
                    // console.log(response2)
                    cookies.set('username', username);
                    cookies.set('id', response2.data.id);
                    cookies.set('token', response.data.token);

                    this.setState({ go_home: true })
                }).catch(error => {
                    console.log(error)
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const {
            username, password, token, go_home,
        } = this.state
        let id = cookies.get('id');
        if (id != null) {
            return window.location.href = "/"
        }
        return (
            <div className="base-login">
                <div className="kontener">
                    <div className="login-logo" style={{ flexDirection: 'column' }}>
                        <img style={{ maxWidth: '25vh',maxHeight: '20vh'}} src="logo_head_zakat.png" alt="" width="50%" />

                    </div>
                    <div className="form-login">
                        <h3 style={{ fontWeight: 'bold' }}>Login</h3><br />
                        <input type="text" className="form-control lgn-frm" placeholder="Username atau Email" name="username" value={username} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="password" className="form-control lgn-frm" placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} /><br />
                        <div style={{ display: 'flex', color: '#65FFDC', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                            <Link href="/login/lupa_password">
                                <label>Lupa Password</label>
                            </Link>
                            <Link href="/login/register">
                                <label>Register</label>
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-success" onClick={() => this.doLogin()}>Login</button>
                    </div>
                </div>
            </div>

        )
    };
}

export default Login;