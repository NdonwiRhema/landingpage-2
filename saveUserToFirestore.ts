import { collection, doc,  getCountFromServer, setDoc } from "firebase/firestore";
import db from "./firebase";

export const saveToFirestore = async (email:string,whatsappNumber:string)=>{
  
 const userData = {
    email:email,
    whatsappNumber:whatsappNumber,
    createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
 }
 const id = 'hi_pay_waitlist'+ Math.round(Math.random()*10000000)
 const numberOfUsers = await getCountFromServer(collection(db,"HiPayUsers"))
 const totalUsers = numberOfUsers.data().count

 await setDoc(doc(db,'HipayUsers',id),{...userData,id:id,position:totalUsers+1})

}