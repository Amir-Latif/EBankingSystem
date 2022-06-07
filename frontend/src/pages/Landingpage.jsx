import React from 'react'
import landing from './landingpage.module.css'


function Landingpage() {
  return (
    <>
        <section className={landing.hero}>
            <h1 className={landing.light_header}>Discover Online Banking. <br></br> Banking on your terms</h1>
            <div>
             {/*<a ><button className={landing.btn}>GET STARTED</button></a>*/}
            </div>
        </section>

        <section className={landing.benefits}>
            <h1 className={landing.header}>Start Banking Effortlessly</h1>
            <div className={landing.benefits_container}>
                <div className={landing.benefits_item}>
                    <div className={landing.benefits_item_title}>
                       { /*<i className={landing.fa-regular+""+fa-user}><i>*/}
                        <h2>Invite Friends</h2>
                    </div>
                    <p>Help a friend bank smarter with little to no fees, high savings rates, and a simple banking
                        app to fit their busy lifestyle.</p>
                </div>
                <div className={landing.benefits_item}>
                    <div className={landing.benefits_item_title}>
                        {/*<i className={landing.fa-solid+""+fa-fingerprint}></i>*/}
                        <h2>Biometric Authentication</h2>
                    </div>
                    <p>Fingerprints, voiceprints, and facial recognition. Boost your account
                        security with biometric authentication</p>
                </div>
                <div className={landing.benefits_item}>
                    <div className={landing.benefits_item_title}>
  {/*<i className={landing.fa-solid+""+fa-money-bill-transfer}></i>*/}
                        <h2>Send Money</h2>
                    </div>
                    <p>Pay your friends directly from your account. All you need is their mobile number or email.
                        It’s fast, easy, and secure.</p>
                </div>
                <div className={landing.benefits_item}>
                    <div className={landing.benefits_item_title}>
                       { /*<i className={landing.fa-solid fa-credit-card}></i>*/}
                        <h2>Debit Card Management</h2>
                    </div>
                    <p>Need a replacement card? Traveling soon? Not a problem – take care of all your debit card
                        needs
                        online.</p>
                </div>
            </div>
            {/*<!-- registration -->*/}
        </section>
        <section className={landing.registration_steps}>
            <div className={landing.steps}>
                <h1 className={landing.header}>Opening an online bank account couldn’t be simpler.</h1>
                <ol>
                    <li>Just give us a few basics (like address and ID number), and we’ll get the ball
                        rolling for you.</li>
                    <li>Make a deposit now or come back and do it later. Whatever makes it easier for you to get
                        going
                        on your goals.</li>
                    <li>Check your email for a confirmation, and you’re on your way to the future you’ve been
                        dreaming
                        of.</li>
                </ol>
            </div>
            <div className={landing.help}>
                <div className={landing.vl}></div>
                <div>
                    <h1 className={landing.header}>Need help? <br></br> We've got your back.</h1>
                    <h2>Our friendly customer service is available <br></br> <span>24/7</span>.</h2>
                </div>
            </div>
        </section>
        {/*<!_- secure -->*/}
        <section className={landing.secure}>
            {/*<i className={landing.fa-solid fa-shield-halved}></i>*/}
            <h1 className={landing.header}>Always Protected, Always Secure</h1>
            <p>Advanced data protection. Digital security tools. We’re committed to providing <br></br> a secure
                online banking experience for our customers.</p>
        </section>
        {/*<!-- Apply -->*/}
        <section className={landing.apply}>
            <h1 className={landing.light_header}>Apply for an online account in minutes</h1>
            <p>Complete your application in as little as 15 minutes, and all you need is a valid ID.</p>
            <div>
               { /*<a href="#" className="landing."><button className={landing.btn} type="submit">GET STARTED</button></a>*/}
            </div>
        </section>

    </>
  )
}

export default Landingpage