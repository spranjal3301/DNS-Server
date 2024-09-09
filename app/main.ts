import * as dgram from "dgram";
import DNSHeader, { OPcode, ResponseCode, TDNSHeader } from "./DNS_msg/header";

const defaultHeaders:TDNSHeader ={
    id:1234,
    qr:1,
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


console.log("Logs from your program will appear here!");
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        
        const header=DNSHeader.write(defaultHeaders);
        const response = header;
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
