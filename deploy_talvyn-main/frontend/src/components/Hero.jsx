import "../styles/hero.css";
import { Button} from 'react-bootstrap';
import heroicon1 from '../assets/images/icons/heroicon1.png';
import heroicon2 from '../assets/images/icons/heroicon2.png';
import heroicon3 from '../assets/images/icons/heroicon3.png';
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { scrollToElement } from '../utils';

const Hero=()=>{
    const handleJoinClick = () => {
        scrollToElement('contact');
    };
    return (
        <div className="hero-section text-center">
        <div className="hero-content">
            <h1>Empowering <span className="highlight">Innovation</span> with Software Solution</h1>
            <p>Talvyn is your partner for custom web development, advanced cybersecurity, and scalable software solutions — built to empower your digital future. We builds secure, scalable software and web solutions tailored for startups and enterprises alike.</p>
            <Button variant="success" onClick={handleJoinClick}>Join with Talvyn <BsArrowUpRightCircleFill style={{marginLeft:"10",fontSize:"25"}}/></Button>
        </div>

        {/* Floating Icons */}
        <img src={heroicon1} alt="icon1" className="floating-icon icon1" />
        <img src={heroicon2} alt="icon2" className="floating-icon icon2" />
        <img src={heroicon3} alt="icon3" className="floating-icon icon3" />
      </div>

    );
}
export default Hero;