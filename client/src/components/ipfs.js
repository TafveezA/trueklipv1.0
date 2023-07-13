import '../App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
//const dotenv = require('dotenv')
//dotenv.config({path:'../config/config.env'})

const projectId = "2SVWWrhQ3SgcSyOW8qroLdETZf2"
const projectSecret = "76cc620d93837d2f1171082c5a44e82f"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})

function IPFS() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      console.log("IPFS URI: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <div>
            <img src={fileUrl} width="600px" />
            <a href={fileUrl} target="_blank">{fileUrl}</a>
          </div>
        )
      }
    </div>
  );
}

export default IPFS