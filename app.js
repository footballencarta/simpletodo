var app = angular.module('MyApp', ['ngStorage']); 

app.controller("MainController", function($scope, $localStorage, $sessionStorage, $window, $interval) {
    $scope.$storage = $localStorage;

    $scope.commandLine = ">";
    $scope.cmd = "";
    $scope.editing = 'false';

    $scope.cur = 0;

    $scope.setCmdFocus = function(state) {
	var inputbox = $window.document.getElementById('cmdField');
	if(state === true)
	    inputbox.focus();
	if(state === false)
	    inputbox.blur();
	$scope.cmd = "";
    };


    $scope.addToList = function(name) {
	$scope.$storage.push({"text": name, "status": "TODO"});
    };

    $scope.toggleDone = function() {
	if($scope.$storage.todoList[$scope.cur].status == "TODO") $scope.$storage.todoList[$scope.cur].status = "WORK";
	else if($scope.$storage.todoList[$scope.cur].status == "WORK") $scope.$storage.todoList[$scope.cur].status = "HOLD";
	else if($scope.$storage.todoList[$scope.cur].status == "HOLD") $scope.$storage.todoList[$scope.cur].status = "DONE";
	else if($scope.$storage.todoList[$scope.cur].status == "DONE") $scope.$storage.todoList[$scope.cur].status = "TODO";
    };

    $scope.cancel = function() {
	$scope.editing = 'false';
	$scope.cmd = "";
	$scope.setCmdFocus(false);
    };

    $scope.tick = function() {
	$scope.clock = Date.now();
    };

    $scope.tick();
    $interval($scope.tick, 1000);

    $scope.actionHandler = function(e) {
	if(e.key == "Escape") {
	    $scope.cancel();
	}
	if($scope.editing == 'false') {
	    $scope.commandLine = ">";
	    if(e.key == 'a') {
		e.preventDefault();
		$scope.editing = 'adding';
		$scope.commandLine = "Item to add:";
		$scope.setCmdFocus(true);
	    }
	    if(e.key == 'j' || e.key == "ArrowDown") {
		if($scope.cur < $scope.$storage.todoList.length-1 && $scope.cur >= 0)
		    $scope.cur++;
	    }
	    if(e.key == 'k' || e.key == "ArrowUp") {
		if($scope.cur <= $scope.$storage.todoList.length && $scope.cur > 0)
		    $scope.cur--;
	    }
	    if(e.key == 'd') {
		$scope.toggleDone();
	    }
	    if(e.key == 'x') {
		$scope.editing = 'delete';
		$scope.commandLine = "Press enter to confirm deletion";
	    }
	    if(e.key == 'c') {
		e.preventDefault();
		$scope.commandLine = "Add a comment:";
		$scope.setCmdFocus(true);
		$scope.cmd = $scope.$storage.todoList[$scope.cur].comment;
		$scope.editing = 'commenting';
	    }
	    if(e.key == 't') {
		e.preventDefault();
		$scope.commandLine = "Set due time:";
		$scope.setCmdFocus(true);
		$scope.cmd = $scope.$storage.todoList[$scope.cur].duetime;
		$scope.editing = 'duetime';
	    }
	    if(e.key == 's') {
		e.preventDefault();
		$scope.commandLine = "Create subtask:";
		$scope.setCmdFocus(true);
		$scope.editing = 'subtask';
	    }
	    if(e.key == 'l') {
		e.preventDefault();
		if($scope.$storage.jiraUrl === null || $scope.$storage.jiraUrl == "") {
		    $scope.commandLine = "Set JIRA ticket URL prefix: (i.e. https://your.jira.url/browse/):";
		    $scope.setCmdFocus(true);
		    $scope.editing = 'newurl';
		} else {
		    $scope.commandLine = "Jira ticket number:";
		    $scope.setCmdFocus(true);
		    $scope.cmd = $scope.$storage.todoList[$scope.cur].ticket;
		    $scope.editing = 'ticket';
		}
	    }
	    if(e.key == 'e') {
		e.preventDefault();
		$scope.commandLine = "Edit task:";
		$scope.setCmdFocus(true);
		$scope.cmd = $scope.$storage.todoList[$scope.cur].text;
		$scope.editing = 'editing';
	    }
	    if(e.key == '[') {
		var x = $scope.$storage.todoList[$scope.cur-1];
		$scope.$storage.todoList[$scope.cur-1] = $scope.$storage.todoList[$scope.cur];
		$scope.$storage.todoList[$scope.cur] = x;
		$scope.cur--;
	    }
	    if(e.key == ']') {
		var x = $scope.$storage.todoList[$scope.cur+1];
		$scope.$storage.todoList[$scope.cur+1] = $scope.$storage.todoList[$scope.cur];
		$scope.$storage.todoList[$scope.cur] = x;
		$scope.cur++;
	    }
		

	}

	if($scope.editing == 'adding') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList.splice($scope.cur+1, 0, {
		    "text": $scope.cmd,
		    "status": "TODO"
		});
		$scope.cancel();
	    }
	}

	if($scope.editing == 'editing') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList[$scope.cur].text = $scope.cmd;
		$scope.cancel();
	    }
	}

	if($scope.editing == 'subtask') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList.splice($scope.cur+1, 0, {
		    "text": "\u2517\u2501 "+$scope.cmd,
		    "status": "TODO"
		});
		$scope.cancel();
	    }
	}

	if($scope.editing == 'commenting') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList[$scope.cur].comment = $scope.cmd;
		$scope.cancel();
	    }
	}

	if($scope.editing == 'duetime') {
	    if(e.key == "Enter") {
		if($scope.cmd === null || $scope.cmd == '') {
		    $scope.$storage.todoList[$scope.cur].duetime = null;
		    delete $scope.$storage.todoList[$scope.cur].duetime;
		} else {
		    var insertDate = new chrono.parse($scope.cmd);
		    insertDate[0].start.assign('timezoneOffset', 0);
		    var parsedDate = insertDate[0].start.date();
		    $scope.$storage.todoList[$scope.cur].duetime = Date.parse(parsedDate);
		}
		$scope.cancel();
	    }
	}

	if($scope.editing == 'delete') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList.splice($scope.cur, 1);
		$scope.cancel();
	    }
	}

	if($scope.editing == 'ticket') {
	    if(e.key == "Enter") {
		$scope.$storage.todoList[$scope.cur].ticket = $scope.cmd;
		$scope.cancel();
	    }
	}

	if($scope.editing == 'newurl') {
	    if(e.key == "Enter") {
		$scope.$storage.jiraUrl = $scope.cmd;
		$scope.cancel();
	    }
	}
	
    };

});
