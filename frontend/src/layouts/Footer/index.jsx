import React from 'react'
import footer from './footer.module.css'

function Footer() {
  return (
    <>
    <footer>
    <section className={footer.footer}>
        <section className={footer.prim}>
            <div className={footer.info}>
                <a href>About Us</a>
                <a href>Careers</a>
                <a href>Customer Care</a>
                <div className={footer.column}>
                    <div className={footer.social}>
                        
                    </div>
                </div>
            </div>
        </section>
        <hr></hr>
        <section className={footer.sec}>
            <div className={footer.copyright}>
                <p>© 2022 Maze Bank., All Rights Reserved.</p>
            </div>
            <div className={footer.Policy}>
                <a href>Privacy Policy</a>
                <p>|</p>
                <a href>Terms of Service</a>
                <p>|</p>
                <a href>Cookie Policy</a>
            </div>
        </section>
    </section>
</footer>
    </>
  )
}

export default Footer