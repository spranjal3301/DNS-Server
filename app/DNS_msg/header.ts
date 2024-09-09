export enum OPcode {
  StandardQuery = 0,
}
export enum ResponseCode {
  NoError = 0,
  FormatError = 1,
  ServerFailure = 2,
  NameError = 3,
  NotImplemented = 4,
  Refused = 5,
}

export interface TDNSHeader {
  id: number;
  qr: number;
  opcode: OPcode;
  aa: number;
  tc: number;
  rd: number;
  ra: number;
  z: number;
  rcode: ResponseCode;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;
}

class DNSHeader {
  static write(value: TDNSHeader) {
    const header = Buffer.alloc(12);
    const flag =
      value.qr |
      value.opcode |
      value.aa |
      value.tc |
      value.rd |
      value.ra |
      value.z |
      value.rcode;

      header.writeInt16BE(value.id,0);
      header.writeInt16BE(flag,2);
      header.writeInt16BE(value.qdcount,4);
      header.writeInt16BE(value.ancount,6);
      header.writeInt16BE(value.nscount,8);
      header.writeInt16BE(value.arcount,10);

    return header;  
  }
}

export default DNSHeader;