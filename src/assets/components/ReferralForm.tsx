import { collection } from 'firebase/firestore';
import { Copy } from 'lucide-react';
import React, { SetStateAction, useState } from 'react'
import db from '../../../firebase';
import { UpdateFirestore } from '../../../saveUserToFirestore';

function ReferralForm({setIsModalOpen}:{setIsModalOpen:React.Dispatch<SetStateAction<boolean>>}) {
     const [copied, setCopied] = useState(false);
      const [formData, setFormData] = useState({
                referrerId: '',
                sheetId: '',
                referralLink: ''
            });

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e:any) => {
            e.preventDefault();
            // Handle form submission here
            // use the data to update this given user.
        UpdateFirestore(formData.referrerId,{sheetId:formData.sheetId}).then(()=>{
            setFormData({...formData,referralLink:`hipay.netlify.app?referral=${formData.referrerId}`})
            handleCopy()
        }).catch((e)=>console.log(e))
  };

  return (
    <div className="fixed inset-0 bg-midnight/50 flex items-center justify-center p-4 z-50">
          <div className="bg-midnight rounded-lg p-6 w-full max-w-md border border-accent/20">
            <h2 className="text-2xl font-bold text-white mb-6">Generate Referral Link</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="referrerId" className="block text-white mb-2">
                  Referrer ID
                </label>
                <input
                  type="text"
                  id="referrerId"
                  required
                  className="w-full px-4 py-2 rounded bg-dark border border-accent/30 text-light focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.referrerId}
                  onChange={(e) => setFormData({...formData, referrerId: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="sheetId" className="block text-white mb-2">
                  Sheet ID
                </label>
                <input
                  type="text"
                  id="sheetId"
                  className="w-full px-4 py-2 rounded bg-dark border border-accent/30 text-light focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.sheetId}
                  onChange={(e) => setFormData({...formData, sheetId: e.target.value})}
                  required
                />
              </div>

              <div>
                <label htmlFor="referralLink" className="block text-white mb-2">
                  My Referral Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="referralLink"
                    placeholder='Your  Referral link will be visible Here'
                    className="w-full px-4 py-2 rounded bg-dark border border-accent/30 text-light focus:outline-none focus:ring-2 focus:ring-accent"
                    value={formData.referralLink}
                    readOnly
                   
                  />
                  <button
                    type="button"
                    onClick={()=> formData.referralLink === '' ? {} :handleCopy()}
                    className={`p-2 bg-accent text-light rounded hover:bg-accent/90 transition-colors ${formData.referralLink === ''? 'opacity-10':'opacity-100'}`}
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-accent mt-1">Copied to clipboard!</p>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-accent text-midnight py-2 rounded hover:bg-accent/90 transition-colors"
                >
                  Generate My Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-midnight text-white py-2 rounded border border-accent/30 hover:bg-accent/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default ReferralForm
