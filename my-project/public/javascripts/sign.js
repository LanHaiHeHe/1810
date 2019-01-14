$(()=>{
    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/sign",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#session_email").val();
        let inputPassword = $("#session_password").val();
        if(inputEmail.trim()==''){
            alert('用户名不能为空');
        }else if(inputPassword.trim()==''){
            alert('密码不能为空');
        }else{
            let data = await login(inputEmail, inputPassword);
            if(data=='success'){
                location.href="http://localhost:3000/login.html";
            }else{
                $("#session_email").val('');
                $("#session_password").val('');
                alert(data);
            }
        }   
    })
})