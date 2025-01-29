import { collection, doc,  getCountFromServer, setDoc } from "firebase/firestore";
import db from "./firebase";

export const saveToFirestore = async (email:string,whatsappNumber:string)=>{
  
 const userData = {
    email:email,
    whatsappNumber:whatsappNumber
 }
 const id = 'hi_pay_waitlist'+ Math.round(Math.random()*10000000)
 const totalUsersQuery = await getCountFromServer(collection(db,"HiPayUsers")) 

 await setDoc(doc(db,'HipayUsers',id),{...userData,id:id,position:totalUsersQuery.data().count+1})

}