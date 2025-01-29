// import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function ConfirmationPage() {
    const params = useLocation()

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-accent/10">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">You're on the list!</h2>
          <p className="mt-2 text-sm text-gray-300">
            Thank you for joining our waitlist. <br/> We've added your email : {params.state.email}.
            <br/>Please be look out for updates on your watsapp number:{params.state.number}
            <br/>We'll keep you updated on our progress.
          </p>
        
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;