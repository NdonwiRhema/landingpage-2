import { doc, setDoc } from "firebase/firestore";
import db from "./firebase";

export const saveToFirestore = async (email:string,whatsappNumber:string,referral?:string )=>{
  
 const userData = {
    email:email,
    whatsappNumber:whatsappNumber,
    referral:referral || '',
    position: referral ? 2 : 1, // If referral is provided, position is 0, otherwise 1
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
 const id = 'hi_pay_waitlist'+ Math.round(Math.random()*10000000)

 await setDoc(doc(db,'HipayUsers',id),{...userData,id:id})

}