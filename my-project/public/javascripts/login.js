$(() => {
    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "./users/login",
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
        let data = await login(inputEmail, inputPassword);
        
        let fn = {
            success() {
                console.log('登录成功');
                localStorage.setItem("token", data.token)
                location.href = "dashboard.html"
            },
            fail() {
                alert('用户名或者密码错误');
            },
            other() {

            }
        }
        fn[data.status]();
        
    })
})
