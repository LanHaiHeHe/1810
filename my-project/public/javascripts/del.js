$(() => {
    if(localStorage.getItem("imgsrc")){
        $("#image").attr("src",localStorage.getItem("imgsrc"));
      
    }
    let inputUser = $("#orderUser");
    let getUserList = (_name,_age,_skill,_description, _city,_aihao) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "./setting/delUser",
                data: {
                    _name, 
                    _age, 
                    _skill, 
                    _description,
                    _city,
                    _aihao
                },
                success(data) {
                    resolve(data)
                }
            })
        })
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
            console.log('删除成功');
            alert('删除成功');
            $("#inputEmail4").val('');
        }else{
            console.log('删除失败');
            alert('删除失败');  
            $("#inputEmail4").val(''); 
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
    (async ()=>{
        let isLogin = await autoLogin();
        if(!isLogin.status){
            localStorage.removeItem("imgsrc");
            location.href="login.html";
        }
    })();
})