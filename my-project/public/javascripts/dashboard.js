$(() => {
    if(localStorage.getItem("imgsrc")){
        $("#image").attr("src",localStorage.getItem("imgsrc"));
        
    }
    console.log(localStorage.getItem("imgsrc"));
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "./setting/findUser",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async () => {
        let fn = {
            true: async () => {
                let data = await getUserList();
                console.log(data);
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
                    <td><a href="javascript:;">删除</a></td>
                </tr>            
            `
                }).join("");
                $("#list").html(html);
            },
            false() {
                localStorage.removeItem("imgsrc");
                location.href = "login.html";
                return this;
            },
            log() {
                console.log("执行完毕");
                return this;
            },
            finish() {
                console.log("执行完毕2")
            },
            // getUserList() {
            //     return new Promise((resolve, reject) => {
            //         $.ajax({
            //             type: "POST",
            //             // headers: {
            //             //     token: localStorage.getItem("token")
            //             // },
            //             url: "http://localhost:3000/setting/findUser",
            //             success(data) {
            //                 resolve(data)
            //             }
            //         })
            //     })
            // },
            autoLogin() {
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
        }
        let isLogin = await fn.autoLogin();
        // 异步 awiat和async
        fn[isLogin.status]();

        // 链式调用
        fn.log()
            .finish();

    })()

    let delUserList = (_name, _age, _skill, _description, _city, _aihao) => {
        return new Promise((resolve, reject) => {
            // console.log(_name,_age,_skill,_description, _city,_aihao);
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


    var list = document.getElementById("list");
    list.onclick = async (e) => {
        var el = e.target;
        var _par = el.parentNode.parentNode;
        var _name = _par.children[1].innerHTML;
        var _age = _par.children[2].innerHTML;
        var _skill = _par.children[3].innerHTML;
        var _description = _par.children[4].innerHTML;
        var _city = _par.children[5].innerHTML;
        var _aihao = _par.children[6].innerHTML;
        let data = await delUserList(_name, _age, _skill, _description, _city, _aihao);
        if (data === 'success') {
            console.log('删除成功');
            alert('删除成功');
        } else {
            console.log('删除失败');
            alert('删除失败');
        }
    }
})