import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WalletProvider } from './contexts/WalletContext';
import { AccessDenied } from './pages/error/AccessDenied';
import { NotFound } from './pages/error/NotFound';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { PrivateCapsules } from './pages/PrivateCapsules';
import { Profile } from './pages/Profile';
import { PublicCapsules } from './pages/PublicCapsules';
import { Register } from './pages/Register';
import { ShareCapsule } from './pages/ShareCapsule';
import { UpdateCapsule } from './pages/UpdateCapsule';
import { ViewCapsule } from './pages/ViewCapsule';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/capsule/:id" element={<ViewCapsule />} />
            <Route path="/capsule/:id/edit" element={<UpdateCapsule />} />
            <Route path="/capsule/:id/share" element={<ShareCapsule />} />
            <Route path="/public" element={<PublicCapsules />} />
            <Route path="/private" element={<PrivateCapsules />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;