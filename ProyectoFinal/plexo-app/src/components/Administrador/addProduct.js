import axios from "axios";
import { useState } from "react";

function Add(){
    const urlAcess = '/api/auth/login'
    const [ add, setAdd] = useState('')

    const AddProduct = (url) {
        axios.post(url, {

        })
    }
}