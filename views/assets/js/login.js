function login() {
    document.querySelector('form').addEventListener('submit', e=>{
        e.preventDefault();
        const objectDataRegister = Object.fromEntries(
            new FormData(e.target)
        );

        const user = objectDataRegister.email;
        const pass = objectDataRegister.password;
    
        const stringJson = JSON.stringify(objectDataRegister);
    
        if(user.includes('@') && pass != ""){
            alert(JSON.stringify(objectDataRegister));
            server.insertMany(process.env.mongoAtlasEntidad,"Empleado",stringJson);
        }
    });   
};

console.log('[ register -> Operative ]');