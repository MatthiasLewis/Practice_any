function getdogpicture(){
    let dog_name= event.target.value;
    let img_name="https://dog.ceo/api/breed/"+dog_name+"/images/random";

    axios
      .get(img_name).then(function (response){
        console.log(response.data);
        let el=document.createElement("div");
        el.innerHTML = `
          <img src="${response.data.message}">
          <h3>品種是${dog_name}</h3>
        `
        document.getElementById("show_picture").append(el); 
      }).catch(function (error){
        console.log(error);
      });
      
}



