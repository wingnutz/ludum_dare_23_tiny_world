
function _classic_create_location(location) {
	var block = document.createElement("pre");
	var html =
		"<a name=\"location_"+location.key+"\"/>"+
		"<b>"+location.name+"</b><br/>";
	if(location.description)
		html += location.description+"<br/>";
	for(var message in location.messages)
		html += "<div class=\"message\">"+location.messages[message]+"</div>"
	html += "<input class=\"commandline\" id=\"commandline_"+location.key+"\"/><br/>"+
		"<div id=\"auto_complete_"+location.key+"\" style=\"display:none;\"></div>"+
		"<div id=\"error_"+location.key+"\" style=\"display:none;\" class=\"error\"></div>";
	block.innerHTML = html;
	return block;
}

var classic_ui = {
	name: "classic",
	init: function() {
		document.getElementById("main_css").href = "classic.css";
	},
	create_location: _classic_create_location,
	perform_layout: function(){
		var main = document.getElementById("main");
		main.style.width = "";
		main.style.height = "";
	},
	get_commandline: function(location) {
		return document.getElementById("commandline_"+location.key);
	},
	scroll_into_view: function(location) {
		window.location.hash = "location_"+location.key;
		classic_ui.get_commandline(current_location).focus();
	},
	set_error: function(location,message) {
		var error = document.getElementById("error_"+location.key);
		error.innerHTML = message;
		error.style.display = "block";
	},
	clear_error: function(location) {
		var error = document.getElementById("error_"+location.key);
		error.style.display = "none";
	},
	get_commands: get_commands,
	on_commandline: function(location,event,line) {
		classic_ui.clear_error(location);
		var auto_complete = (event.keyCode == 32) && event.shiftKey;
		if(auto_complete)
			classic_ui.show_commands(location,classic_ui.get_commands(location));
		else
			document.getElementById("auto_complete_"+location.key).style.display = "none";
	},
	show_commands: function(location,commands) {
		var auto_complete_helper = document.getElementById("auto_complete_"+location.key), command, command_names = [];
		for(command in commands)
			command_names.push(command);
		auto_complete_helper.innerHTML = ""+command_names;
		auto_complete_helper.style.display = "block";
	},
	enter_room: function() {},
};

uis.push(classic_ui);
