require('dotenv').config();
const tmi = require('tmi.js');

var Ev3 = require ("./Ev3.js");
var Ev3_base = Ev3.base;

//list of accepted commands
const commands = ['!forward', '!reverse', '!stop'];

var motor_on_focus = "a";
var motor_output = {"a": 0, "b":0,"c":0, "d":0};

var remoteControl = function(target){

    const client = new tmi.Client({
        options: { debug: true, messagesLogLevel: "info" },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: process.env.TWITCH_USERNAME,
            password: process.env.TWITCH_PASSWORD
        },
        channels: [ process.env.TWITCH_CHANNEL ]
    });

    //connect to twitch servers
    client.connect().catch(console.error);

    //Listen to messages in chat
    client.on('message', (channel, tags, message, self) => {
        if(self) return;
        if(message.toLowerCase() === '!hello') {
            client.say(channel, `@${tags.username}, heya!`);
        }

        //return if not a command
        if (message[0] !== '!') return;

        const currentCommand = message.split(' ')[0];

        //check for a value after command
        let currentPower = message.split(' ')[1] || NaN;
        let needPower = true;

        //handle invalid commands
        if (!commands.includes(currentCommand)) {
            client.say(channel, `Sorry @${tags.username}, command ${currentCommand} is invalid!`);
        }
        else {
            //disable reading a value for non-value commands
            if (currentCommand === '!stop') { needPower =  false;}

            //handle commands with missing value
            if (needPower && isNaN(currentPower)) {
                client.say(channel, `@${tags.username}, please specify the power [0-100]`);
            }
            else
            {
                //limit power within the range of [0-100]
                if (currentPower < 0)  currentPower = 0;
                if (currentPower >100) currentPower = 100;

                //handle valid commands
                switch (currentCommand) {
                    case '!forward':
                        //send forward command to the robot
                        motor_output[motor_on_focus]=-currentPower;
                        break;
                    case '!reverse':
                        //send reverse command to the robot
                        motor_output[motor_on_focus]=currentPower;
                        break;
                    case '!stop':
                        //send stop command to the robot
                        motor_output[motor_on_focus]=0;
                        break;
                
                    default:
                        break;
                }

                client.say(channel, `OK @${tags.username}, sending command ${currentCommand} to P-001 with power = ${currentPower}`);

                //send it over to Lego robot
                var output = target.getOutputSequence(motor_output["a"],motor_output["b"],motor_output["c"],motor_output["d"]);
                target.sp.write( output,function(){});
            }
        }
    });

}






var robot = new Ev3_base("/dev/tty.MAK-SerialPort"); // put your bluetooth socket.

robot.connect(function(){
    robot.start_program(remoteControl); 
});