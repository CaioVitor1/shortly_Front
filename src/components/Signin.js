import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { useContext } from "react";
import short from "../assets/short.png";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate(); 


    function logInto() {
        const body = {
                email: email,
                password: password
            }
            const promise = axios.post("https://shortly-project-16.herokuapp.com/signin", body);
            promise
            .then(res =>{
                console.log("deu bom");
                console.log(res.data)
                setUser(
                    {   
                        token: res.data,
                    },
                );
            navigate('/main');
            })
            .catch(err => {
                console.log(err);
                console.log("deu ruim")
                alert("Você inseriu dados inválidos. Insira novamente!")
            })
    }

return (
    <BodySignIn>
        <InitialPageBody>
            <Topo>
                <Link style={{ textDecoration: 'none' }} to={`/signin`} ><h3>Entrar</h3></Link>
                <Link style={{ textDecoration: 'none' }} to={`/signup`} > <h4>Cadastrar</h4></Link>
            </Topo>
            
                <Title>
                    <h2> Shortly</h2>
                    <img src={short} />
                </Title>
            
        </InitialPageBody>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            <button onClick={logInto}> Entrar</button> 
    </BodySignIn>
)


}

const BodySignIn = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 170px;

input {
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: black;
    margin-left: 18px;
    margin-bottom: 13px;
}
button {
    width: 182px;
    height: 60px;
    left: 640px;
    top: 701px;
    background: #5D9040;
    border-radius: 12px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
}

`

const InitialPageBody = styled.div `
background-color: #FFFFFF;
width: 900px;
margin: 0 auto;
box-sizing: border-box;
font-family: 'Lexend Deca', sans-serif;
margin-bottom: 60px;
`

const Topo = styled.div`
display: flex;
justify-content: flex-end;
margin-right: 20px;
h3{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #5D9040;  
    margin-right: 20px;
}
h4{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #9C9C9C;   
    margin-right: 20px;
}
`

const Title = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2{
        font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 200;
    font-size: 64px;
    line-height: 80px;
    color: #000000;
    }
    img{
        Width:102px;
    Height: 96px;
    }
`