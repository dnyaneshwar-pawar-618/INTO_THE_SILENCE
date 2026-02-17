let url = "http://universities.hipolabs.com/search?name=India";
let btn = document.querySelector('button');

btn.addEventListener('click', async ()=>{
    let state = document.querySelector('input').value;
    console.log(state)
    // collegeInfo();
})

async function collegeInfo(){
    try{
        let res = await axios.get(url);
        console.log(res);
    } catch(e){
        console.log(e);
    }
}