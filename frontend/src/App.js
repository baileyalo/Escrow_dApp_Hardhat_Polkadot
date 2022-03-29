import React from "react";
import { BigNumber, ethers } from "ethers";
import {abi} from "./escrowabi.js";
import { Button, Image, Header, Divider, Form, Label, Dimmer, Loader, Segment} from 'semantic-ui-react';

import './App.css';

function Contract (){

  const escrowAddress = "0x46dB388bd612F706250E4dCAF8F5d42cA920A229";
  if (!window.ethereum){
    throw new Error("No crypto wallet found. Please install it.");
  }
  window.ethereum.request({ method: 'eth_requestAccounts'})
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(escrowAddress, abi, signer);
  return contract;
}

export default function App() {
 
  const [startTime,setstartTime] = React.useState();
  const [timeleft,settimeleft] = React.useState();
  const [curnttime,setcurnttime] = React.useState();
  const [timeLock, settimeLock] = React.useState();
  const [vaultBalance, setvaultBalance] = React.useState();
  const [ethValue, setEthValue] = React.useState(60);
  
  const [timer, setTimer] = React.useState();
  const id =React.useRef(null);
  const clear=()=>{
  window.clearInterval(id.current)}

  React.useEffect(()=>{
    id.current=window.setInterval(()=>{
     setTimer((time)=>time - 1)
   },1000)
   return ()=>clear();
 },[])

 React.useEffect(()=>{
   if(timer === 0){
     clear()
   }

 },[timer])

  React.useEffect(() => {

      const contract = Contract();
      const locktimePromise = new Promise((resolve, reject) => { 
        resolve(contract.lockTime());  
      });
      const starttimePromise = new Promise((resolve, reject) => { 
        resolve(contract.start());  
      });
      const balPromise = new Promise((resolve, reject) => { 
        resolve(contract.balance());  
      });
      Promise.all([locktimePromise, starttimePromise, balPromise]).then((values) => {
        console.log(values[0]);
        setvaultBalance(Number(ethers.BigNumber.from(values[2]).toString()));
        console.log(Number(ethers.BigNumber.from(values[1]).toString()) + Number(ethers.BigNumber.from(values[0]).toString()) - Math.floor((new Date()).getTime() / 1000));
        setTimer(Number(ethers.BigNumber.from(values[1]).toString()) + Number(ethers.BigNumber.from(values[0]).toString()) - Math.floor((new Date()).getTime() / 1000));
      });
     
  }, []);


  const handleSendPayment = async (e) => {
    e.preventDefault();
    const contract = Contract();
    const myPromise = new Promise((resolve, reject) => {  
      resolve(contract.SendPayment({value: ethValue}));  
    });
    myPromise.then( ()=>{
      setvaultBalance(Number(ethers.BigNumber.from(contract.balance()).toString()));
      console.log();
    });
  }

  const handleClaimPayment = async (e) => {
    e.preventDefault();
    const contract = Contract();
    const tx = await contract.ClaimPayment();  
  }

  const handleConfirmDeliver = async (e) => {
    e.preventDefault();
    const contract = Contract();
    const tx = await contract.ConfirmDeliver(); 
  }

  const handleDenyDeliver = async (e) => {
    e.preventDefault();
    const contract = Contract();
    const tx = await contract.DenyDeliver();   
  }

  const handleAgentTransfer = async (e) => {
    e.preventDefault();
    const contract = Contract();
    const tx = await contract.AgentTransfer();   
  }

  return (
    <Form>
    <div className="App">
    <Image src='https://gateway.pinata.cloud/ipfs/Qme3DRmyQMHQz4ua6QjywxASuL8igQYCwB6cKHXmrPeuk4' size='small' circular />
      <div>Time left : {timer} </div>

      <div>Vault Balance: {vaultBalance}</div>
      <br/>
      <Form.Field inline>
      <input id="ethValue" type="text" placeholder="Deposit Amount" onChange={event => setEthValue(event.target.value)}/>
      <Label basic color='red' pointing='below'>
        Please enter a value.
      </Label>
      <br/>
      </Form.Field>
    
      <Button  onClick={handleSendPayment} secondary> Send Payment</Button>
      <br/>
      <Divider />
      <Button onClick= {handleClaimPayment}> Claim Payment</Button><br/>
      <Divider />
      <Button onClick= {handleConfirmDeliver}> Confirm Deliver</Button><br/>
      <Divider />
    
      <Button onClick= {handleAgentTransfer}> Agent Transfer</Button><br/>
      <br/>
      <br/>
  
    </div>
    </Form>
  );
}