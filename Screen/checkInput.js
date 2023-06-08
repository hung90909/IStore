export const validateEmail = (text) => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text === "") {
        return false
    }else if(!email.test(text)){
        return false
    }
    else{
        return true
    }
}

export const valadatePassword = (text) =>{
     if(text === ""){
        return false 
     }else if(text.length > 10){
        return false
     }else{
        return true
     }
}
