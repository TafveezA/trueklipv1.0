## IPFS c


## IPFS CLI Guide

### Install IPFS CLI
```shell
npm i --location=global ipfs
```
### pin a file
```shell
jsipfs pin add `${CID}`
```
### list a file

```shell
jsipfs pin ls
```
### remove a file
```shell
jsipfs pin rm `${CID}`
```
### remove everything from node 
```shell
jsipfs repo gc
```
### Spawn a Node
```shell
jsipfs daemon
```