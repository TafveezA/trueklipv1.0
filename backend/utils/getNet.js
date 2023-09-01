function getNet(){
let net
if (document.getElementById("tn").checked) net = "wss://s.altnet.rippletest.net:51233"
if (document.getElementById("dn").checked) net = "wss://s.devnet.rippletest.net:51233"
return net
} // End of getNet()

module.exports = {getNet}