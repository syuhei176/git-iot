var child_process = require('child_process');
var fs = require('fs');


getUptimeLoop();

function getUptimeLoop() {
	getUptime(function(data) {
		fs.appendFileSync('data.txt', data[0] + "," + data[1] + "," + data[2] + "\n");
		git_cmd();
		setTimeout(getUptimeLoop, 10000);
	});
}

function getUptime(cb) {
	var exec = require('child_process').exec;
	var child = exec('uptime', function (error, stdout, stderr) {
		var index = stdout.indexOf('load averages:');
		var str = stdout.substr(index+15);
		var las = str.split(' ');
	    cb([Number(las[0]), Number(las[1]), Number(las[2])]);
	});
}


function git_cmd(cb) {
    child_process.execSync('git add .');
    child_process.execSync('git commit -m "Added data"');
}

