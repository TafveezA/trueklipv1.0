const {create}=require("ipfs-http-client")

async function ipfsClient(){
    const ipfs = await create({
        host:"localhost",
        port:5001,
        protocol:"https"

    })
return ipfs
}

async function saveText(){
    let ipfs= await ipfsClient()
    await ipfs.add("hello")
    console.log(result);
}

saveText()