const { connect } = require('mongoose');

// Database Connection
exports.dbConnect = () => {
    main().then(() => console.log(`[-] ${process.env.ATLAS_URL} Database Connected`)).catch((e) => console.log(e));

    async function main() {
        await connect(process.env.ATLAS_URL);
    }

}
