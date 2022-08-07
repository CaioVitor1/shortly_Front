import styled from 'styled-components';
import axios from 'axios';
import short from "../assets/short.png";
import trophy from "../assets/trophy.png"
import { useState, useEffect } from 'react';

function RenderList({index, name, visitcount, linkscount}) {
    return (
    <h3> {index+1}. {name} - {linkscount} links - {visitcount} visualizações</h3>
    )
}

export default function InitialPage() {
    const [ranking, setRanking] = useState([])

  useEffect(() => {
   
    const promise = axios.get("http://localhost:4000/ranking")
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
        <div className='initialPage'>
            <div className='topo'>
                <h3>Entrar</h3>
                <h4>Cadastrar</h4>
            </div>
            <div className='mainContent'>
                <div className='title'>
                    <h2> Shortly</h2>
                    <img src={short} />
                </div>
                <div className='ranking'>
                    <div className='ranking-title'>
                        <img src={trophy} />
                        <h3> Ranking</h3>
                    </div>
                    <div className='ranking-list'>
                        {ranking.map((data, index) => <RenderList index={index} name={data.name} linkscount={data.linkscount} visitcount={data.visitcount} />)}
                    </div>
                </div>
            </div>
            <div className='footer'>
                <h3> Crie sua conta para usar nossos serviços</h3>
            </div>
        </div>
    )
}