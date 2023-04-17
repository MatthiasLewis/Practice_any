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

var n=0;
function dogtype(){
    for (n in dogarray){
        let elTr=document.getElementById("click_1");
        elTr.innerHTML = `
            <img src=${dogarray[n].picture}>;
            <h3>'The dog is '${dogarray[n].name}</h3>
            `
    }
  n++ ;
}  