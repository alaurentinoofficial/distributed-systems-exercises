const UdpClient = require('../utils/udp_client');
const { CalculateInvoker } = require('./client_invoke_handler')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let socket = UdpClient("localhost", 4040);

// Client
(function Client() {
    rl.question('Calculation: ', function (txt) {
        let match = txt.match(/^(\d+)([+-\/*])(\d+)$/)

        if(match) {
            const params = match.slice(1, 4)
            const p = CalculateInvoker(socket, {
                n1: params[0],
                operation: params[1],
                n2: params[2]
            }).then(p => {
                if(p.status == "ERROR") console.error(p.message);
                else console.log(`\n[SERVER] The result of ${p.n1}${p.operation}${p.n2}: ${p.result}`);
            });
        } else {
            console.error(`[Calc UDP] the typed value "${data}" is invalid`
                          + "\nAvailable operations:"
                          + "\n\tSum: '<number>+<number>'"
                          + "\n\tMinus: '<number>-<number>'"
                          + "\n\tMultiplication: '<number>*<number>'"
                          + "\n\tDivide: '<number>/<number>'\n")
        }

        Client();
    });
})()