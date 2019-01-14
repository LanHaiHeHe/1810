$(() => {
    let inputUser = $("#orderUser");
    let getUserList = (name, age, skill, description,city,aihao) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "./setting/updateUser",
                data: {
                    name, 
                    age, 
                    skill, 
                    description,
                    city,
                    aihao
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    if(localStorage.getItem("imgsrc")){
        $("#image").attr("src",localStorage.getItem("imgsrc"));
       
    }
    inputUser.click(async () => {
        let inputEmail4=$("#inputEmail4").val();
        let inputPassword4=$("#inputPassword4").val();
        let inputAddress=$("#inputAddress").val();
        let inputAddress2=$("#inputAddress2").val();
        let inputCity=$("#inputCity").val();
        let inputState=$("#inputState").val();
        let data=await getUserList(inputEmail4,inputPassword4,inputAddress,inputAddress2,inputCity,inputState);
        if(data === 'success'){
            console.log('修改成功');
            alert('修改成功');
            $("#inputEmail4").val('');
            $("#inputPassword4").val('');
            $("#inputAddress").val('');
            $("#inputAddress2").val('');
            $("#inputCity").val(''); 
            $("#inputState").val('');
        }else{
            console.log('修改失败'); 
            alert('修改失败');  
            $("#inputEmail4").val('');
            $("#inputPassword4").val('');
            $("#inputAddress").val('');
            $("#inputAddress2").val('');
            $("#inputCity").val(''); 
            $("#inputState").val('');
        }
    });
    let autoLogin=()=> {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                url: "./users/autoLogin",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async()=>{
        let isLogin = await autoLogin();
        if(!isLogin.status){
            localStorage.removeItem("imgsrc");
            location.href="login.html";
        }
    })();
})