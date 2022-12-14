import styled from 'styled-components';
import axios from 'axios';
import short from "../assets/short.png";
import trophy from "../assets/trophy.png"
import { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { useContext } from "react";

function RenderList({index, name, visitcount, linkscount}) {
    return (
    <h3> {index+1}. {name} - {linkscount} links - {visitcount} visualizações</h3>
    )
}

export default function InitialPage() {
    const { user, setUser } = useContext(UserContext);
    console.log(user)
    const [ranking, setRanking] = useState([])

  useEffect(() => {
   

    const promise = axios.get("https://shortly-project-16.herokuapp.com/ranking")
    promise
    .then(res =>{
        console.log(res.data);
        setRanking(res.data)
        console.log("o ranking é: ")
        console.log(ranking)
    })
    .catch(err => {
        console.log(err);
        console.log("deu ruim")
    })
}, [])

    return (
        <InitialPageBody>
            <Topo>
                <Link style={{ textDecoration: 'none' }} to={`/signin`} ><h3>Entrar</h3></Link>
                <Link style={{ textDecoration: 'none' }} to={`/signup`} > <h4>Cadastrar</h4></Link>

            </Topo>
            
                <Title>
                    <h2> Shortly</h2>
                    <img src={short} />
                </Title>
               
                    <RankingTitle>
                        <img src={trophy} />
                        <h3> Ranking</h3>
                    </RankingTitle>
                    <RankingList>
                        {ranking.map((data, index) => <RenderList index={index} name={data.name} linkscount={data.linkscount} visitcount={data.visitcount} />)}
                    </RankingList>
                
            
            <Footer>
                <h3> Crie sua conta para usar nossos serviços</h3>
            </Footer>
        </InitialPageBody>
    )
}

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

const RankingTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    h3{
        font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 45px;
    color: #000000; 
    }

    img{
        width: 55px;
        height: 55px;
    }
`

const Footer = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
    }
`

const RankingList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
    }
`
