import * as dgram from "dgram";
import DNSHeader, { OPcode, ResponseCode, TDNSHeader } from "./DNS_msg/header";
import DNSQuestion, { DNSQuestionType, TDNSQuestion, DNSQuestionClass } from './DNS_msg/question';

const defaultHeaders:TDNSHeader ={
    id:1234,
    qr:1<<15,
    opcode:OPcode.StandardQuery,
    aa:0,
    tc:0,
    rd:0,
    ra:0,
    z:0,
    rcode:ResponseCode.NoError,
    qdcount:0,
    ancount:0,
    nscount:0,
    arcount:0
}
const defaultQuestion:TDNSQuestion={
    name:"codecrafters.io",
    type:DNSQuestionType.A,
    Qclass:DNSQuestionClass.IN
}

console.log("Logs from your program will appear here!");
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        
        const header=DNSHeader.write({...defaultHeaders,qdcount:1});
        const question=DNSQuestion.write([defaultQuestion]);

        const response = Buffer.concat([header,question]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});

//!Test
//-echo "Your Message" | nc -u 127.0.0.1 2053  
//-dig @127.0.0.1 -p 2053 codecrafters.io 
//-dig @127.0.0.1 -p 2053 +noedns codecrafters.io.
