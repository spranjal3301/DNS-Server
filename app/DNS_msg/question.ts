export enum DNSType {
  A = 1,
  NS = 2,
  MD = 3,
  MF = 4,
  CNAME = 5,
  SOA = 6,
  MB = 7,
  MG = 8,
  MR = 9,
  NULL = 10,
  WKS = 11,
  PTR = 12,
  HINFO = 13,
  MINFO = 14,
  MX = 15,
  TXT = 16,
}
export enum DNSClass {
  IN = 1,
  CS = 2,
  CH = 3,
  HS = 4,
}
export interface TDNSQuestion {
  name: string;
  type: DNSType;
  Qclass: DNSClass;
}

class DNSQuestion {
  static write(questions: TDNSQuestion[]) {
    return Buffer.concat(
      questions.map(({ name, type, Qclass }) => {
        const str = name
          .split(".")
          .map((nm) => `${String.fromCharCode(nm.length)}${nm}`)
          .join("");

        const typeANDclass = Buffer.alloc(4);

        typeANDclass.writeInt16BE(type);
        typeANDclass.writeInt16BE(Qclass, 2);

        return Buffer.concat([Buffer.from(str + "\0", "binary"), typeANDclass]);
      })
    );
  }
}

export default DNSQuestion;

// TYPE            value and meaning

// A               1 a host address

// NS              2 an authoritative name server

// MD              3 a mail destination (Obsolete - use MX)

// MF              4 a mail forwarder (Obsolete - use MX)

// CNAME           5 the canonical name for an alias

// SOA             6 marks the start of a zone of authority

// MB              7 a mailbox domain name (EXPERIMENTAL)

// MG              8 a mail group member (EXPERIMENTAL)

// MR              9 a mail rename domain name (EXPERIMENTAL)

// NULL            10 a null RR (EXPERIMENTAL)

// WKS             11 a well known service description

// PTR             12 a domain name pointer

// HINFO           13 host information

// MINFO           14 mailbox or mail list information

// MX              15 mail exchange

// TXT             16 text strings
