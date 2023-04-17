let dogarray = [
    {
        name:"Affenpinscher",
        picture:"https://images.dog.ceo/breeds/affenpinscher/n02110627_2911.jpg"
    },
    {
        name:"Akita",
        picture:"https://images.dog.ceo/breeds/akita/Japaneseakita.jpg"
    },
    {
        name:"African",
        picture:"https://images.dog.ceo/breeds/african/n02116738_4742.jpg"
    },
    {
        name:"Airedale",
        picture:"https://images.dog.ceo/breeds/airedale/n02096051_5285.jpg"
    }
];

var i=0;
function dogtype(){
        let elTr=document.createElement("div");
        elTr.innerHTML = `
            <img src=${dogarray[i].picture}>
            <h3>'The dog is ${dogarray[i].name}</h3>
            `
        document.querySelector("#click_1").append(elTr);
    i++; 
}  
