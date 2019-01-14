var fileNode = document.getElementById("file");
fileNode.onchange = function () {
    var data = new FormData();
    data.append("abc", fileNode.files[0]);
    $.ajax({
        url: 'http://localhost:3000/users/upload',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            document.getElementById("image").src = `http://localhost:3000/${data.file.filename}`;
            localStorage.setItem('imgsrc',document.getElementById("image").src);
            
        }
    });
    fileNode.value = null;
  
}