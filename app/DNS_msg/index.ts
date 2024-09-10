import DNSAnswer, { TDNSAnswer } from "./answer";
import DNSHeader, { Bit, OPcode, ResponseCode, TDNSHeader } from "./header";
import DNSQuestion, { DNSClass, DNSType, TDNSQuestion } from "./question";

export interface TResMessage{
    header:TDNSHeader;
    question:TDNSQuestion;
    answer:TDNSAnswer;
}

export const DNSResmessage:TResMessage={
    header:{
        id:1234,
        qr:1,
        opcode:OPcode.StandardQuery,
        aa:0,
        tc:0,
        rd:0,
        ra:0,
        z:0,
        rcode:ResponseCode.NoError,
        qdcount:1,
        ancount:1,
        nscount:0,
        arcount:0
    },
    question:{
        name:"codecrafters.io",
        type:DNSType.A,
        Qclass:DNSClass.IN
    },
    answer:{
        name:"codecrafters.io",
        type:DNSType.A,
        Qclass:DNSClass.IN,
        ttl:60,
        data:"142.250.77.142"
    }
}

export default function composeMessage(message:TResMessage){
    const header=DNSHeader.write(message.header);
    const question=DNSQuestion.write([message.question]);
    const answer=DNSAnswer.write([message.answer]);

    return Buffer.concat([header,question,answer]);
}

export function parseMessage(data:Buffer):TResMessage{
    let offset = 0;

    DNSResmessage.header.id=data.readUInt16BE(offset);
    offset += 2;

    const flags = data.readUInt16BE(offset);
    DNSResmessage.header.qr = ((flags >> 15) & 1 )as Bit;
    DNSResmessage.header.opcode = (flags >> 11) & 15;
    DNSResmessage.header.aa = (flags >> 10) & 1;
    DNSResmessage.header.tc = (flags >> 9) & 1;
    DNSResmessage.header.rd = (flags >> 8) & 1;
    DNSResmessage.header.ra = (flags >> 7) & 1;
    DNSResmessage.header.z = (flags >> 4) & 7;
    DNSResmessage.header.rcode = flags & 15;
    offset += 2;

    DNSResmessage.header.qdcount = data.readUInt16BE(offset);
    offset += 2;

    DNSResmessage.header.ancount = data.readUInt16BE(offset);
    offset += 2;

    DNSResmessage.header.nscount = data.readUInt16BE(offset);
    offset += 2;

    DNSResmessage.header.arcount = data.readUInt16BE(offset);
    offset += 2;

    let loop = true;
    let q_name_array = [];
    while (loop) {
      const name_size = data.readUInt8(offset);
      offset += 1;
      if (name_size === 0) {
        loop = false;
        break;
      }
      const q_name_sub = data.subarray(offset, offset + name_size).toString();
      offset += name_size;
      q_name_array.push(q_name_sub);
    }
    DNSResmessage.answer.name = DNSResmessage.question.name = q_name_array.join(".");
    DNSResmessage.question.type = data.readUInt16BE(offset);
    offset += 2;
    DNSResmessage.question.Qclass = data.readUInt16BE(offset);
    offset += 2;



    return DNSResmessage;
}