import * as IPFS from 'ipfs-core';

async function main() {
const node = await IPFS.create();

const fileAdded = await node.add({
  path: "test.txt",
  content: "Hello IPFS!",
});

console.log("Added file:", fileAdded.path, fileAdded.cid);
}

main();