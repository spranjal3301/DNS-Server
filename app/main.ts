import * as dgram from "dgram";
import composeMessage, { parseMessage } from "./DNS_msg";




console.log("Logs from your program will appear here!");
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const DNSmessage = parseMessage(data);
        console.log(DNSmessage);
       
        const response = composeMessage(DNSmessage);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});

//!Test
//-echo "Your Message" | nc -u 127.0.0.1 2053  
//-dig @127.0.0.1 -p 2053 codecrafters.io 
//-dig @127.0.0.1 -p 2053 +noedns codecrafters.io.
