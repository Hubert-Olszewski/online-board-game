import io from "socket.io-client";

const serverPort = 3001;

export const domainClientURL = `http://localhost:${serverPort - 1}`;

const socket = io(`http://localhost:${serverPort}`);
export default socket;