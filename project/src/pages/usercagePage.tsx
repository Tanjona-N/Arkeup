import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UseCaseDetail from '../components/UseCaseDetail';

const UseCaseDetailPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main>
        <UseCaseDetail />
      </main>
      <Footer />
    </div>
  );
};

export default UseCaseDetailPage;
