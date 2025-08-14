// src/pages/WhatWeDo.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./WhatWeDo.css";  // <-- Import CSS here

const services = [
  { title: "Venue Finding", slug: "/services/venue-finding", img: "/placeholders/venue.jpg", alt: "Venue Finding" },
  { title: "Set Building", slug: "/services/set-building", img: "/placeholders/set.jpg", alt: "Set Building" },
  { title: "AV & Production", slug: "/services/av-production", img: "/placeholders/av.jpg", alt: "AV and Production" },
  { title: "Pre Event Planning", slug: "/services/pre-event-planning", img: "/placeholders/planning.jpg", alt: "Pre Event Planning" },
];

export default function WhatWeDo() {
  return (
    <main className="what-page" aria-labelledby="what-title">
      {/* Keep same topbar/navbar in your layout — this component assumes shared header exists */}
      <header className="what-header">
        <h1 id="what-title" className="what-title">What We Do.</h1>
      </header>

      <section className="services-grid-section" aria-label="Service categories">
        <div className="services-grid" role="list">
          {services.map((s, idx) => (
            <article key={s.slug} className="service-card" role="listitem">
              {/* Using Link to make the whole card accessible & route client-side */}
              <Link
                to={s.slug}
                className="card-link"
                aria-label={`Go to ${s.title} service page`}
              >
                <div className="card-media" aria-hidden="true">
                  {/* Decorative image; will be provided by user later */}
                  <img src={s.img} alt={s.alt} loading="lazy" />
                  {/* overlay + title */}
                  <div className="card-overlay" />
                  <div className="card-title">{s.title}</div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="services-description" aria-label="About our event services">
        <div className="desc-inner">
          {/* Long descriptive paragraph ~30 lines as you requested (feel free to replace with your final copy) */}
          <p>
            Planzee delivers end-to-end event services engineered to take the logistical
            burden off your shoulders and deliver remarkable, memorable experiences.
          </p>
          <p>
            From the earliest concept sketches to the final applause, our team handles every
            operational detail with precision and passion. We find venues that fit your brand,
            negotiate terms, and ensure site readiness so you can focus on the creative vision.
          </p>
          <p>
            Our set-building specialists craft immersive environments — bespoke stages,
            thematic backdrops, and structural elements that turn ideas into tangible settings.
            We collaborate with designers and engineers to ensure aesthetics and safety work
            hand-in-hand.
          </p>
          <p>
            AV & Production is at the core of any great event. We deliver professional audio,
            lighting, video displays and live-mixing solutions, plus on-site technicians who
            guarantee flawless playback, crisp sound and emotionally-driven lighting cues.
          </p>
          <p>
            Pre-event planning covers timelines, staff scheduling, transport logistics, vendor
            coordination and contingency planning. We map out every mile, minute, and meal so
            the day runs like clockwork.
          </p>
          <p>
            Our catering partners offer diverse menus—from plated dining to experiential live
            cooking, and everything in between—tailored to cultural preferences, dietary needs,
            and the tone of your event.
          </p>
          <p>
            Guest transport and shuttle management are designed to deliver punctuality and
            comfort. We plan secure pick-ups, dedicated staff escorts, and VIP transport flows
            to keep attendees happy and on time.
          </p>
          <p>
            Themed decor and custom seating transform venues into stories. Our decorators can
            source floral, furniture, props and signage, and provide full set dressing on-site.
          </p>
          <p>
            Entertainment booking is handled end-to-end—artist outreach, rider negotiation,
            scheduling, and on-site hospitality—so performers focus on what they do best.
          </p>
          <p>
            We also provide technical rehearsals, site surveys, health & safety audits, and
            permit coordination so your event complies with local regulations and runs safely.
          </p>
          <p>
            Our production managers are your on-the-ground command team, troubleshooting in
            real-time and adapting to last-minute changes without compromising the audience
            experience.
          </p>
          <p>
            Reporting and post-event services include attendee feedback capture, vendor
            reconciliation, and performance analysis to help you iterate and improve future
            events.
          </p>
          <p>
            Whether it’s an intimate corporate evening, a large festival, or a themed party,
            our modular services scale up or down to fit budgets and creative goals.
          </p>
          <p>
            We pride ourselves on transparent pricing, collaborative planning, and a creative
            mindset that elevates every brief. Partner with us and turn logistical complexity
            into a seamless, joyful experience for you and your guests.
          </p>
          <p>
            To explore detailed case studies, past work, or request a custom proposal, use the
            contact links at the footer or the Planzee Services menu in the site navigation.
          </p>
        </div>
      </section>
    </main>
  );
}
