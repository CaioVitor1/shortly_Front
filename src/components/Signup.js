import styled from "styled-components";
import react from "react";
import { Link,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import short from "../assets/short.png";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); 

    function register () {
        const body = {
            name,
            email,
            password,
            confirmPassword
        }
        console.log(body)
        const promise = axios.post("https://shortly-project-16.herokuapp.com/signup", body)
        promise
        .then(res => {
            console.log(res.data);
            navigate('/signin');
        })
        .catch(res => {
            console.log("deu ruim")
            alert("Você inseriu dados inválidos ou já cadastrados. A senha precisa conter 8 digitos, letras maiúsculas, minúsculas e um caractere especial")
        })
    }

    return (
        <BodySignUp>
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

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" />
            <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme a senha" />
            <button onClick={register}> Criar conta</button> 
    </BodySignUp>
)
}

const BodySignUp = styled.div`
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