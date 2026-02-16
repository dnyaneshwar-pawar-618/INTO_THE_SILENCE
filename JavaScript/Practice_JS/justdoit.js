// callback hell

// function getData(dataId, getNextData) {
//     setTimeout(() => {
//         console.log('data', dataId)
//         if (getNextData) {
//             getNextData();
//         }
//     }, 1000);
// }

// // callback hell
// getData(1, () => {
//     getData(2, () => {
//         getData(3, () => {
//             getData(4)
//         });
//     });
// })






// to solve problem of callback hell Promises comes into picture

// let promise = Promise((resolve, reject)=>{
//     console.log('I am a promise')
//     reject('some error occured')
// })

// function getData(dataId, getNextData) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('data', dataId);
//             resolve('success');
//         }, 1000);
//     })
// }

// // Promise chain

// getData(1)
//     .then((res) => {
//         return getData(2);
//     })
//     .then((res) => {
//         return getData(3);
//     })
//     .then((res) => {
//         console.log('success')
//     })


// async await

function getData(dataId, getNextData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('data', dataId);
            resolve('success');
        }, 1000);
    })
}
async function getWeatherData(){
    console.log('getting data 1.......')
    await getData(1);
    
    console.log('getting data 2.......')
    await getData(2);

    console.log('getting data 3.......')
    await getData(3);
}