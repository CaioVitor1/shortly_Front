import styled from "styled-components";
import react from "react";
import { Link,  Navigate,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from "../context/UserContext";
import { useContext } from "react";
import short from "../assets/short.png";
import trash from "../assets/trash.png";

function RenderUrl({url, shortUrl, visitcount, user, id, setShortUrl, setNameUser}) {
    
    function deleteUrl() {
        console.log(user.token)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
    
            }
        }
        const promise = axios.delete(`https://shortly-project-16.herokuapp.com/urls/${id}`, config);
        promise
        .then(res =>{
            console.log("deu bom")
            console.log(res.data);
            console.log("apagamos")
            updateUrls();

        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
            alert("Você inseriu dados inválidos. Insira novamente!")
        })
    }
    function updateUrls() {
        
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const promise = axios.get("https://shortly-project-16.herokuapp.com/users/me", config)
            promise
            .then(res =>{
                console.log(res.data);
                setShortUrl(res.data.shortenedUrls)
                setNameUser(res.data.name)
                console.log("as urls são: ")
               
            })
            .catch(err => {
                console.log(err);
                console.log("deu ruim")
            })
       
        
    }
    
    function openLink() {

        const promise = axios.get(`https://shortly-project-16.herokuapp.com/urls/open/${shortUrl}`)
            promise
            .then(res =>{
                console.log(res.data);
                const red = res.data.split(' ')
                window.open(red[red.length -1])
                updateUrls()
               
            })
            .catch(err => {
                console.log(err);
                console.log("deu ruim")
            })
    }

    return (
        <SpaceUrl>
            <LinkUrl> 
                <h3 onClick={openLink}> {url}</h3>
                <h3 onClick={openLink}> {shortUrl}</h3>
                <h3> Quantidade de visitantes: {visitcount}</h3>
            </LinkUrl>
            <Trash>
                <img onClick={deleteUrl}  src={trash} />
            </Trash>
        </SpaceUrl>
    )
    
}


export default function Main() {
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { nameUser, setNameUser } = useContext(UserContext);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState([]);
  
    
    console.log("o TOKEN é: ")
    console.log(user.token)

    function makeShortUrl() {
        console.log(url)
        const body = {
            url: url,
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
    
            }
        }
        const promise = axios.post("https://shortly-project-16.herokuapp.com/urls/shorten", body, config);
        promise
        .then(res =>{
            console.log("deu bom")
            console.log(res.data);
            updateUrls()
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
            alert("Você inseriu dados inválidos. Insira novamente!")
        })
        
        
         function updateUrls() {
        
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const promise = axios.get("https://shortly-project-16.herokuapp.com/users/me", config)
            promise
            .then(res =>{
                console.log(res.data);
                setShortUrl(res.data.shortenedUrls)
                setNameUser(res.data.name)
                console.log("as urls são: ")
               
            })
            .catch(err => {
                console.log(err);
                console.log("deu ruim")
            })
       
        
    }
        
    }
    

    useEffect(() => {
   
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const promise = axios.get("https://shortly-project-16.herokuapp.com/users/me", config)
        promise
        .then(res =>{
            console.log(res.data);
            setShortUrl(res.data.shortenedUrls)
            setNameUser(res.data.name)
            console.log("as urls são: ")
            console.log(shortUrl)
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    }, [])

    function checkOut() {
        console.log("Vamos limpar o token e o nome do User")
        setUser(
            {   
                token: "",
            }
        )
        setNameUser("")
        navigate('/')
    }


return (
    <InitialPageBody>
            <TopoMain>
                
                    <h4> Seja bem vindo, {nameUser}</h4>
                
                <Right>
                    <Link style={{ textDecoration: 'none' }} to={`/main`} ><h3>HOME</h3></Link>
                    <Link style={{ textDecoration: 'none' }} to={`/ranking`} > <h3>Ranking</h3></Link>
                     <h3 onClick={checkOut}>Sair</h3>
                </Right>
            </TopoMain>
           
                <Title>
                    <h2> Shortly</h2>
                    <img src={short} />
                </Title>
            <UrlsUser>
                <PostUrl>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Links que cabem no bolso" />
                    <button onClick={makeShortUrl}> encurtar link</button> 
                </PostUrl>
                <Urls>

                {shortUrl.map((data) => <RenderUrl setNamsetNameUsere={setNameUser} setShortUrl={setShortUrl} id={data.id} user={user} url={data.url} shortUrl={data.shortUrl} visitcount={data.visitcount} />)}    
                    
                </Urls>
            </UrlsUser>


            
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

const TopoMain = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 20px;

    h4 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #5D9040;
    }
    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9C9C9C;   
        margin-right: 20px; 
    }
`

const Right = styled.div`
    display: flex;
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

const UrlsUser = styled.div`
margin-top: 60px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 30px;
`

const PostUrl = styled.div`
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
    color: #FFFFFF
}
input {
    width: 600px;
    height: 60px;
    background: #FFFFFF;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px;
}
`

const Urls = styled.div`
margin-top: 50px;
    display: flex;
    flex-direction: column;
`

const SpaceUrl = styled.div`
display:flex;
`

const LinkUrl = styled.div`
width: 650px;
height: 60px;
left: 248px;
top: 452px;
display: flex;
justify-content: space-around;
align-items: center;
background: #80CC74;
box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
border-radius: 12px 0px 0px 12px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: #FFFFFF;
margin-bottom: 20px;
` 

const Trash = styled.div`
width: 130px;
height: 60px;
display: flex;
justify-content: center;
align-items: center;

img{ 
    width: 22px;
    height: 26px
}
`