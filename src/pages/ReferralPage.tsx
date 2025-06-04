import React, { useState } from 'react';
import ReferralForm from '../assets/components/ReferralForm';

const ReferralSection: React.FC = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <div className="relative min-h-screen">
      {/* Hero Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/billsplit-d206c.appspot.com/o/hipay-assets%2Freferral.png?alt=media&token=673a3741-4ab3-463e-ab87-e7f40e409f97')"
        }}
      >
        <div className="absolute inset-0 bg-midnight/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Join Our Referral Program
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Invite your friends and earn amazing rewards together
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent/90 text-light px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Refer a Friend
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReferralForm setIsModalOpen={setIsModalOpen}/>
      )}
    </div>
  )
};

export default ReferralSection;