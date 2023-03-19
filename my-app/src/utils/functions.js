export const generateId=()=>{

///40 chars

let alpha= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,"A","B","C","D","E","F","G","H","I","J",
"K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a", "b", "c", 
"d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let result="";
for(let i=0;i<40;i++){
    let rnd=Math.floor(Math.random()*alpha.length)
    result +=alpha[rnd]
}
return result
}

export const generateToken=(email,password)=>{
    let alpha= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,"A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a", "b", "c", 
    "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let result="";
  
    for(let n=0;n<3;n++){
    for(let i=0;i<password.length;i++){
            let code =password.charCodeAt(i)%email.length;
            result +=code/2 +alpha[code*1000%alpha.length]
           let ch=email[(code+n*n)%email.length];
           let j=alpha.indexOf(ch.toLowerCase())+n*n*n;
           result +=j*20+password[(j+n)%password.length]
           


    }
   
}
console.log(result)
    return result 
}