import React, { useRef } from "react";
import { useTimer } from "react-timer-hook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./IndexPage.css";

export default function IndexPage() {
  const expiryTimestamp = new Date(2025, 11, 25, 0, 0, 0);
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {}
  });

  const scrollRef = useRef();

  const scrollToPhotos = () => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="index-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="contact-info">
          <a href="tel:+918762737373">
            <i className="fa-solid fa-phone"></i> +91 8762737373
          </a>
          <a href="mailto:maharshiyashdeep@gmail.com">
            <i className="fa-solid fa-envelope"></i> maharshiyashdeep@gmail.com
          </a>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fa-brands fa-instagram instagram-icon"></i> marshii_._</a>
          <a href="#"><i className="fa-brands fa-facebook"></i> Maharshitr</a>
          <a href="#"><i className="fa-brands fa-telegram"></i> Maharshi Yashu</a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/what-we-do">What we do</Link></li>
          <li className="dropdown">
            Planzee Services <span>▼</span>
            <ul className="dropdown-menu">
              <li><Link to="/services/sound-lighting">Sound and Lighting</Link></li>
              <li><Link to="/services/guest-transport">Guest transport</Link></li>
              <li><Link to="/services/catering">Catering</Link></li>
              <li><Link to="/services/venue-selection">Venue selection</Link></li>
              <li><Link to="/services/games-entertainment">Games and Entertainment</Link></li>
              <li><Link to="/services/themed-decor">Themed decor</Link></li>
            </ul>
          </li>
          <li><Link to="/latest-works">Latest Works</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h1 className="title">
          PLAN<span className="purple-z">Z</span>EE <span className="purple-z">*</span>
        </h1>
        <p className="subtitle">“BRING YOUR HOLIDAY CHEER – WE’LL BRING THE MAGIC!”</p>
        <div className="scroll-icon" onClick={scrollToPhotos}><i className="fa-solid fa-chevron-down"></i></div>
      </header>

      {/* Main Section */}
      <section className="main-content">
        <div className="left-box" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="badge">AWESOME CHRISTMAS</div>
          <a href="https://www.youtube.com/watch?v=ji1-rBmdCqA" target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
            <img src="/images/video-cover.jpg" alt="Christmas Party Video" className="video-cover" style={{ width: "100%", borderRadius: "8px" }} />
          </a>
          <div className="countdown" style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "15px" }}>
            {days} : {hours} : {minutes} : {seconds}
          </div>
          <div className="cta-text" style={{ marginTop: "10px", textAlign: "center" }}>
            <b>Don’t miss out, Book Your Christmas Party Now!</b>
          </div>
        </div>

        <div className="right-box" style={{ flex: 1 }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
          >
            <SwiperSlide>
              <img src="/images/slide1.jpg" alt="Slide 1" className="slide-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slide2.jpg" alt="Slide 2" className="slide-img" />
            </SwiperSlide>
          </Swiper>
          <button className="book-now">BOOK NOW</button>
          <div className="carousel-text">CHECK OUT OUR RANGE OF FANTASTIC THEMED CHRISTMAS PARTIES.</div>
          <div className="pill-buttons">
            <Link to="/shared-party" className="pill">SHARED PARTIES</Link>
            <Link to="/exclusive-party" className="pill">EXCLUSIVE PARTIES</Link>
          </div>
        </div>
      </section>

      {/* Sample photos */}
      <section className="photos-section" ref={scrollRef}>
        <h2>Sample photos of events</h2>
        <div className="photo-grid">
          <div className="photo"><img src="/images/photo1.jpg" alt="Event 1" /></div>
          <div className="photo"><img src="/images/photo2.jpg" alt="Event 2" /></div>
          <div className="photo"><img src="/images/photo3.jpg" alt="Event 3" /></div>
          <div className="photo"><img src="/images/photo4.jpg" alt="Event 4" /></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-col">
          <h3>About</h3>
          <p>Your event partner delivering joy and magic.</p>
        </div>
        <div className="footer-col">
          <h3>Contact</h3>
          <p>Phone: +91 8762737373</p>
          <p>Email: maharshiyashdeep@gmail.com</p>
        </div>
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li>Sound & Lighting</li>
            <li>Guest Transport</li>
            <li>Catering</li>
            <li>Venue Selection</li>
            <li>Games & Entertainment</li>
            <li>Themed Decor</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Follow</h3>
          <p><i className="fa-brands fa-instagram instagram-icon"></i> marshii_._</p>
          <p><i className="fa-brands fa-facebook"></i> Maharshitr</p>
          <p><i className="fa-brands fa-telegram"></i> Maharshi Yashu</p>
        </div>
      </footer>
    </div>
  );
}
