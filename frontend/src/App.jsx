import React from 'react';
import { Routes, Route } from 'react-router-dom';

import IndexPage from './components/IndexPage';
import WhatWeDo from './pages/WhatWeDo';
import VenueFinding from './pages/VenueFinding';
import SetBuilding from './pages/SetBuilding';
import AVProduction from './pages/AVProduction';
import PreEventPlanning from './pages/PreEventPlanning';
import SoundAndLighting from './pages/SoundAndLighting';
import GuestTransport from './pages/GuestTransport';
import Catering from './pages/Catering';
import VenueSelection from './pages/VenueSelection';
import GamesEntertainment from './pages/GamesEntertainment';
import ThemedDecor from './pages/ThemedDecor';
import LatestWorks from './pages/LatestWorks';
import ContactPage from './pages/ContactPage';
import SharedParty from './pages/SharedParty';
import ExclusiveParty from './pages/ExclusiveParty';
import PaymentPage from './pages/PaymentPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/what-we-do" element={<WhatWeDo />} />
      <Route path="/services/venue-finding" element={<VenueFinding />} />
      <Route path="/services/set-building" element={<SetBuilding />} />
      <Route path="/services/av-production" element={<AVProduction />} />
      <Route path="/services/pre-event-planning" element={<PreEventPlanning />} />
      <Route path="/services/sound-lighting" element={<SoundAndLighting />} />
      <Route path="/services/guest-transport" element={<GuestTransport />} />
      <Route path="/services/catering" element={<Catering />} />
      <Route path="/services/venue-selection" element={<VenueSelection />} />
      <Route path="/services/games-entertainment" element={<GamesEntertainment />} />
      <Route path="/services/themed-decor" element={<ThemedDecor />} />
      <Route path="/latest-works" element={<LatestWorks />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shared-party" element={<SharedParty />} />
      <Route path="/exclusive-party" element={<ExclusiveParty />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}
