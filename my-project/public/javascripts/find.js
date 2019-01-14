$(()=>{
    if(localStorage.getItem("imgsrc")){
        $("#image").attr("src",localStorage.getItem("imgsrc"));
        
    }
    let getUserList = (name) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                data:{
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    
    $("#orderUser").click(async ()=>{
        let name=$("#inputEmail4").val();
        let data = await getUserList(name);
        
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td>${item.city}</td>
                    <td>${item.aihao}</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
        $("#inputEmail4").val('');
    });
    let autoLogin=()=> {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                url: "http://localhost:3000/users/autoLogin",
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