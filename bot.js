/* BOT INFO*/
console.log('');
console.log('  KARHU');
console.log('  by boi#3136');
console.log('');

/* LIBRARIES */
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var colors = require('colors');
var http = require('http');
console.log('[LIBRARIES]'.green + ' Ready');


/* VARIABLES */
var oracle = true;
const token = 'Mzg5MDYyNzM1MDc5NDA3NjI4.DQ2ILQ.IzUhOxkYe6i6ti-1zUagFyle5nw';
process.env.TZ = 'Europe/Helsinki';
var lines = '';
var lineslength = 0;
var flines = '';
var flineslength = 0;
var help_data = '';
var rulemsg = [];
var s_hei = ['moi', 'mui', 'hai', 'terve', 'tere', 'tervehdys', 'moikkelis koikkelis', 'hej', 'hejsan', 'tere tere', 'heyyyyy', 'moro', 'niao', 'zau', 'tsau', 'heippa', 'heipsis', 'morjens', 'hola', 'hei', 'heissan', 'heips', 'helou'];
var port = process.env.PORT || 8080;
var s_time = new Date();
var s_mo = s_time.getMonth() + 1;
var s_ts = addLeadingZero(s_time.getDate().toString()) + '.' + addLeadingZero(s_mo.toString()) + '.' + s_time.getFullYear().toString() + ' ' + addLeadingZero(s_time.getHours().toString()) + ':' + addLeadingZero(s_time.getMinutes().toString());
console.log('[VARIABLES]'.green + ' Ready');

/* FUNCTIONS */
function addLeadingZero(n){ return n < 10 ? '0'+n : ''+n }
function registerReactionListener(rules) {
    rules.bulkDelete(2);
    rules.send('Luithan säännöt?');
    rules.send('Reagoi tähän viestiin OK- emojilla, niin saat "Säännöt ovat tehty luettaviksi"- arvon automaattisesti').then(function(message) {
        message.react("🆗");
        rulemsg.push(message.id);
    });
    console.log('[CLIENT]   '.green + ' Reaction listener registered for channel ' + rules.id);
}
console.log('[FUNCTIONS]'.green + ' Ready');


/* OTHER */
fs.readFile('data/quotes.txt', function(err, data){
    if(err) throw err;
	data += '';
    lines = data.split('\n');
	lineslength = lines.length;
	
	console.log('[OTHER]    '.green + ' Quotes loaded (' + lineslength + ' rows)');
});
fs.readFile('data/facts.txt', function(err, data){ 
	if(err) throw err;
	data += '';
    flines = data.split('\n');
	flineslength = flines.length;
	
	console.log('[OTHER]    '.green + ' Facts loaded (' + flineslength + ' rows)');
});
fs.readFile('data/help.txt', function(err, data){ 
	if(err) throw err;
	data += '';
    help_data = data;
	
	console.log('[OTHER]    '.green + ' Info loaded');
});


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<style>*{margin:0;}</style><body><a href="#" onclick="alert(\'Ok\');location.reload();">Bot sleeping? wake bot</a></body>'); 
	res.end();
}).listen(port);



/* CLIENT */
client.on('ready', () => {
	client.user.setGame('s!apua');
	console.log('[CLIENT]   '.green + ' Ready');
	console.log('');
    
    registerReactionListener(client.channels.get('386576114711134208'));
    registerReactionListener(client.channels.get('390238971332001792'));
});
client.on('messageReactionAdd', (reaction, user) => {
    if (rulemsg.indexOf(reaction.message.id) > -1) {   
        if (user.id !== '389062735079407628') {
            let role = reaction.message.guild.roles.find("name", "Säännöt ovat tehty luettaviksi");
            reaction.message.guild.members.get(user.id).addRole(role).catch(console.error);
            console.log('[CLIENT]   '.yellow + ' Added role to user ' + user.tag);
        }
    }
});
client.on('messageReactionRemove', (reaction, user) => {
    if (rulemsg.indexOf(reaction.message.id) > -1) {   
        if (user.id !== '389062735079407628') {
            let role = reaction.message.guild.roles.find("name", "Säännöt ovat tehty luettaviksi");
            reaction.message.guild.members.get(user.id).removeRole(role).catch(console.error);
            console.log('[CLIENT]   '.yellow + ' Removed role from user ' + user.tag);
        }
    }
});
client.on('message', message => {
	if (message.content.substring(0, 2).trim() == 's!') {
		var args = message.content.substring(2).split(' ');
		var cmd = args[0];

		args = args.splice(1);
		
		console.log('[MESSAGE]  '.yellow + ' ' + message.author.tag + ' (' + message.author.id + '): ');
		console.log('            '.yellow + message.content);
		
		/* BOT COMMANDS */
		switch (cmd.toLowerCase()) {
			case 'sananlasku':
				if (args.length > 0) {
					if (args[0] < 1896) {
						if (args[0] >= 0) {
							message.channel.send({
								embed: {
									color: 2208672,
									title: lines[args[0]],
									footer: {
										text: 'Suomalainen sananlasku #' + args[0].toString()
									}
								}
							});
						}
					}
				} else {
					var rnln = Math.floor(Math.random() * lineslength);
					message.channel.send({
						embed: {
							color: 2208672,
							title: lines[rnln],
							footer: {
								text: 'Suomalainen sananlasku #' + rnln.toString()
							}

						}
					});
				}
				break;
				
			case 'fakta':
				if (args.length > 0) {
					if (args[0] < 32) {
						if (args[0] >= 0) {
							message.channel.send({
								embed: {
									color: 16392795,
									title: flines[args[0]],
									footer: {
										text: 'Suomalainen fakta #' + args[0].toString()
									}
								}
							});
						}
					}
				} else {
					var rnln = Math.floor(Math.random() * flineslength);
					message.channel.send({
						embed: {

							color: 16392795,
							title: flines[rnln],
							footer: {
								text: 'Suomalainen fakta #' + rnln.toString()
							}
						}
					});
				}
				break;
				
			case 'apua':
                message.author.sendMessage(help_data);
                message.react("🆗");
				break;
				
			case 'info':
				message.channel.send(':information_source: Karhu on ollut päällä ' + s_ts.toString() + ' lähtien');
				break;
				
			case 'moi':
				if (args.length > 0) {
					if (args[0].indexOf('@') !== -1) {
						message.delete();
						message.channel.send(s_hei[Math.floor(Math.random()*s_hei.length)] + ' ' + args[0]);
					}
				}
				break;
			case 'oraakkeli':
				if (args.length > 0) {
					if (args[0].length < 70) { /* question must be below 70 characters */
						var kysymysa = message.content.substring(12);
						var kysymys = encodeURI(kysymysa.replace(" ", "+"));

						if (oracle == true) { /* cooldown */
							oracle = false;
							setTimeout(function() {
								oracle = true;
							}, 5000);
							request.get({
									uri: 'http://www.lintukoto.net/viihde/oraakkeli/index.php?kysymys=' + kysymys + '&html',
									encoding: null
								},
								function(err, resp, body) {
									var bodyWithCorrectEncoding = iconv.decode(body, 'iso-8859-1');
									var vastaus = bodyWithCorrectEncoding.trim();
									if (vastaus.length < 250) {
										message.channel.send({
											embed: {
												color: 16709372,
												title: kysymysa,
												description: vastaus,
												footer: {
													text: 'lintukoto.net - oraakkeli'
												},
												url: 'http://www.lintukoto.net/viihde/oraakkeli/index.php?kysymys=' + kysymys
											}
										});
									} else {
										message.reply(':x: Virhe 196');
									}
								}
							);
						} else {
							message.channel.send(':hourglass: Oraakkelin on jäähdyttävä viitisen sekuntia');
						}
					} else {
						message.channel.send(':x: Virhe 204');
					}
				}
				break;
		}
	}
});

client.login(token);