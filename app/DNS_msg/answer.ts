import { DNSClass, DNSType } from "./question";

export interface TDNSAnswer {
  name: string;
  type: DNSType;
  Qclass: DNSClass;
  ttl: number;
  data: string;
}

class DNSAnswer {
  static write(answers: TDNSAnswer[]) {
    return Buffer.concat(answers.map(({ name, type, Qclass, ttl, data }) => {
      const str = name
        .split(".")
        .map((nm) => `${String.fromCharCode(nm.length)}${nm}`)
        .join("");

      const buffer= Buffer.alloc(10);

      buffer.writeInt16BE(type);
      buffer.writeInt16BE(Qclass,2);
      buffer.writeInt16BE(ttl,4);
      buffer.writeInt16BE(data.length,6);
      

      return Buffer.concat([
        Buffer.from(str+"\0","binary"),
        buffer,
        Buffer.from(data+'\0',"binary")
      ]);

    }));
  }
}

export default DNSAnswer;
