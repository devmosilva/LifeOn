import React, {useState , useEffect} from 'react'

import logoImg from '../../assets/images/logo.png'

import landingImg from '../../assets/images/home.png'

import { Link } from 'react-router-dom'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'



import './styles.css'
import api from '../../services/api'


function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);

     useEffect(() => {
         api.get('connections').then(res => {
             const {total} = res.data
             setTotalConnections(total)
         })
     }, [])   

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo Proffy" />
                    <h2>Sua saúde não pode terminar antes da pandemia.</h2>
                </div>
                <img src={landingImg} alt="Landing" className="hero-image"/>
                <div className="buttons-container">
                    <Link to='/study' className="study" > 
                    <img src={studyIcon} alt="Estudar"/>
                    Consulta
                    </Link>

                    <Link to='/give-classes' className="give-classes" > 
                <img src={giveClassesIcon} alt="Estudar"/> 
                        Atenda
                    </Link>
                </div>
               
                <span className="total-connections">
                    total de {totalConnections} conexões 
                    <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>

            </div>
        </div>
    )
}

export default Landing;