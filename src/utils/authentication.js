import { getAuth } from "firebase/auth";
import { app } from "./firebase";


// ✅ Initialize Firebase App
const auth = getAuth(app);
export default auth;