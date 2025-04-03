import { WebSocketServer } from "ws";

import {port} from "@repo/utils"


const wss = new WebSocketServer({ port: port });

wss.on("connection", (ws) => {

})