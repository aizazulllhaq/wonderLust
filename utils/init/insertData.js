const { connect } = require('mongoose');
const listingModel = require('../../models/listngModel');
const Listing = listingModel.Listing;
let { data } = require('./data2');

main().then(() => console.log('connected'))

async function main() {
    await connect('mongodb://127.0.0.1:27017/wonderLust');
}

// const addData = async () => {
//     await Listing.deleteMany({});
//     data = data.map((obj) => ({ ...obj, owner: "65bc76cfbad9458370396743" }));
//     await Listing.insertMany(data);
//     console.log('inserted');
// }

// addData();

const insertData = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Data inserted successfully");
}

insertData();
