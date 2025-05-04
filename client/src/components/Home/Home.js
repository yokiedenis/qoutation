import React from 'react'
import styles from './Home.module.css'
import imagex from "../../imgx.jpeg"
const Home = () => {
   
    return (
        <div className={styles.pageContainer}>
            
            <section className={styles.hero}>
                <h3>Qoutation System</h3>
                <div className={styles.paragraph}>
                   
                    <p>Qoutation application made with MongoDB, Express, React & Nodejs</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src={imagex} alt="invoicing-app"/>
                </div>
            </section>
        </div>
    )
}

export default Home
