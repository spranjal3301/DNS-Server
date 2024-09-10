[![progress-banner](https://backend.codecrafters.io/progress/dns-server/6efce53c-5022-4a1b-90bc-b80604212902)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

# Custom DNS Server Project

This project implements a custom DNS server in multiple stages, gradually building up functionality from a basic UDP server to a full-fledged forwarding DNS server.

## Project Stages

### Stage 1: Setup a UDP Server
In this initial stage, we set up a basic UDP server that can receive and send packets. This forms the foundation for our DNS server, as DNS typically uses UDP for communication.

### Stage 2: Write Header Section
We implement the header section of the DNS packet. The header contains important metadata about the DNS query or response.

For more detailed information about the DNS packet format, you can refer to:
- [Wikipedia: Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)
- [RFC 1035](https://tools.ietf.org/html/rfc1035)
- [DNS Packet Format Tutorial](https://www2.cs.duke.edu/courses/fall16/compsci356/DNS/DNS-primer.pdf)

### Stage 3: Write Question Section
In this stage, we implement the question section of the DNS packet. This section contains the query name, type, and class.

### Stage 4: Write Answer Section
Here, we implement the answer section of the DNS packet. This section contains the resource records that respond to the query in the question section.

### Stage 5: Parse Header Section
We develop functionality to parse the header section of incoming DNS packets, extracting relevant information for processing.

### Stage 6: Parse Question Section
This stage involves parsing the question section of incoming DNS packets to understand the nature of the DNS query.

### Stage 7: Parse Compressed Packet
DNS uses a compression scheme to reduce packet size. In this stage, we implement functionality to parse compressed DNS packets.

### Stage 8: Implement a Forwarding DNS Server
In the final stage, we implement a forwarding DNS server. This type of DNS server doesn't resolve queries itself but forwards them to another DNS server for resolution. It acts as an intermediary between the client and the authoritative DNS server.

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/yourusername/dns-server.git
cd dns-server
```


2. Install dependencies:
```sh
bun install
```

3. Run the DNS server:
```sh
bun dev
```