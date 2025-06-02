import React from 'react'
import '../styles/HomeStyle.css'
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import BTienda from '../image/BTienda.jpg';
import BTurista from '../image/BTurista.jpg';
import VideoFondo from '../image/VideoFondoInicio.mp4';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='containerStart'>
            <video className="backgroundVideo" autoPlay loop muted>
                <source src={VideoFondo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="containerOneHome">
                <img src={LogoKomunaGO} alt="Logo KomunaGo" />
            </div>

            <div className="containerTwoHome">
                <Link to="register-store"> 
                    <div className="containerLoginStoresHome">
                        <img className="buttonImg" src={BTienda} alt="button 1" />
                    </div> 
                </Link>
                
                <Link to="/turist-store">
                    <div className="containerLoginTueistHome">
                        <img className="buttonImg" src={BTurista} alt="button 2" /> 
                    </div>
                </Link>
            </div>
        </div>
    )
}
