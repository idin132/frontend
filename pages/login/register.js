import React, { Component } from 'react';
import Link from 'next/link';
import * as Endpoint from '../../service/Endpoint';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';


const cookies = new Cookies();


const api = Endpoint.BASE_URL;
class Daftar extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            no_hp: '',
            alamat: '',
            username: '',
            password: '',


            go_back: true,
            go_home: true,
        }
    }

    // componentDidMount() {
    //     axios.get(Endpoint.GET_YAYASAN).then(
    //         res => {
    //             this.setState({ yayasan: res.data.data });
    //         }
    //     )
    // }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    send() {
        const {
            name, email, no_hp, alamat, username, password,go_back,go_home,
        } = this.state

        if (name == null || name == '') {
            alert('Nama Tidak Boleh Kosong')
        } else if (email == null || email == '') {
            alert('Email Tidak Boleh Kosong')
        } else if (no_hp == null || no_hp == '') {
            alert('Nomor Handphone Tidak Boleh Kosong')
        } else if (alamat == null || alamat == '') {
            alert('Alamat Tidak Boleh Kosong')
        } else if (username == null || username == '') {
            alert('Username Tidak Boleh Kosong')
        } else if (password == null || password == '') {
            alert('Tidak Boleh Kosong')
        } else if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            const parameter = {
                "name": name,
                "email": email,
                "no_hp": no_hp,
                "alamat": alamat,
                "username": username,
                "password": password,
            }

            axios.post(Endpoint.REGISTER, parameter).
                then(response => {
                    if (response.data.status == 400) {
                    } else {
                        alert('Email Terkirim, mohon cek email untuk reset password !')
                        this.setState({ go_home: true })
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            alert('Email Tidak Valid')
        }
    }
    callbackInput = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        const {
            name, email, no_hp, alamat, username, password,go_back,go_home,
        } = this.state
        if (go_back)
            return window.location.href = "/login/register"
        else if (go_home)
            return window.location.href = "/home"

        return (
            <div className="base-login">
                <div className="kontener" style={{ height: 'auto'}}>
                    <div className="login-logo" style={{ flexDirection: 'column', height: 'auto' }}>
                        <img src="/logo_head_zakat.png" alt="" width="50%" />

                    </div>
 
                    <div className="form-login">
                        <h3 style={{ fontWeight: 'bold' }}>Register</h3><br />
                        <input type="text" className="form-control lgn-frm" placeholder="Masukkan Nama" name="name" value={name} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="email" className="form-control lgn-frm" placeholder="Masukkan Email" name="email" value={email} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="number" className="form-control lgn-frm" placeholder="Masukkan Nomor Handphone" name="no_hp" value={no_hp} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="text" className="form-control lgn-frm" placeholder="Alamat" name="alamat" value={alamat} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="text" className="form-control lgn-frm" placeholder="Masukkan Username" name="username" value={username} onChange={(e) => this.handleInputChange(e)} /><br />
                        <input type="password" className="form-control lgn-frm" placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} /><br />
                        <div style={{ marginBottom: '20px', color: '#65FFDC', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Link href="/login/lupa_password">
                                <label>Lupa Password</label>
                            </Link>
                            <Link type="submit" href="/login">
                                <label>Login</label>
                            </Link>
                        </div>
                        <button type="button" className="btn" onClick={() => this.send()} style={{backgroundColor: '#65FFDC', color:'white'}}>CONTINUE</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Daftar;