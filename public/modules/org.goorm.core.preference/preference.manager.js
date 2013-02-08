/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * project_name : goormIDE
 * version: 1.0.0
 **/

org.goorm.core.preference.manager = function () {
	this.treeview = null;
	this.preferences = null;
};

org.goorm.core.preference.manager.prototype = {
	init: function (option) {
		this.preferences = [];
	},
	
	// get default preference file
	get_default_file: function (path, callback) {
		$.getJSON(path, function(json){
			if ($.isFunction(callback)) {
				callback(json);
			}
		});
	},
	
	// add treeview node revursively
	add_treeview: function (parent, json){
		var self = this;
		var label = json.label;
		var tmpnode = new YAHOO.widget.HTMLNode(label, parent, json.expanded);
		
		if ($.isArray(json.child)) {
			$.each(json.child, function(index, object){
				self.add_treeview(tmpnode, object);
			});
		}
	},

	// create treeview structure
	create_treeview: function (json) {
		var self = this;
		var treeview = new YAHOO.widget.TreeView("preference_treeview");
		
		var core = new YAHOO.widget.HTMLNode(json.core.label, treeview.getRoot(), json.core.expanded);
		var plugin = new YAHOO.widget.HTMLNode(json.plugin.label, treeview.getRoot(), false);

		// self.localization_ids.push({
			// 'id' : core.labelElId,
			// 'localization_key' : json.core.localization_key
		// });
		
		// add subtrees
		$.each(json.core.child, function(index, object){
			self.add_treeview(core, object);
		});
		
		treeview.render();
		this.treeview = treeview;
	},
	
	// add tabview node reculsively
	add_tabview: function(json, plugin_name){
		var self = this;
		var label = json.id || json.label;
		label = label.replace(/[/#. ]/g,"");
		
		plugin_name || (plugin_name = "null");
		
		$("#preference_tabview").append("<div id='" + label + "' plugin="+plugin_name+" style='display:none'></div>");
		var tabview = new YAHOO.widget.TabView(label);
		if ($.isArray(json.tab)) {
			// 각각의 탭을 추가한다.
			$.each(json.tab, function(index, object){
				if(!$.isEmptyObject(object.html)){
					var url = object.html;
					var label = object.label;
					var classname = object.classname;
					$.ajax({
						type: "GET",
						dataType: "html",
						async: false,
						url: url,
						success: function(data) {
							var tab = new YAHOO.widget.Tab({ 
							    label: label, 
							    content: data 
							});
							tabview.addTab(tab);
							
//							if(classname) {
//								eval("self.preferences.push("+"new "+classname+"())");
//								eval("self.preferences[self.preferences.length-1].init()");
//							}
						}
					});
				}
			});
			
			tabview.set('activeIndex', 0);
		}
	},
	
	// create treeview structure
	create_tabview: function (json) {
		var self = this;
		var tabview = null;
		$.each(json.core.child, function(index, object) {
			self.add_tabview(object);
		});
	},
	
	unserialize : function(data){
	    // Takes a string representation of variable and recreates it  
	    // 
	    // version: 810.114
	    // discuss at: http://phpjs.org/functions/unserialize
	    // +     original by: Arpad Ray (mailto:arpad@php.net)
	    // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
	    // +     bugfixed by: dptr1988
	    // +      revised by: d3x
	    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
	    // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays 
	    // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
	    // *       returns 1: ['Kevin', 'van', 'Zonneveld']
	    // *       example 2: unserialize('a:3:{s:9:"first_name";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
	    // *       returns 2: {first_name: 'Kevin', midName: 'van', surName: 'Zonneveld'}
	    
	    var error = function (type, msg, filename, line){throw new window[type](msg, filename, line);};
	    
	    var read_until = function (data, offset, stopchr){
	        var buf = [];
	        var chr = data.slice(offset, offset + 1);
	        var i = 2;
	        while(chr != stopchr){
	            if((i+offset) > data.length){
	                error('Error', 'Invalid');
	            }
	            buf.push(chr);
	            chr = data.slice(offset + (i - 1),offset + i);
	            i += 1;
	        }
	        return [buf.length, buf.join('')];
	    };
	    
	    var read_chrs = function (data, offset, length){
	        buf = [];
	        for(var i = 0;i < length;i++){
	            var chr = data.slice(offset + (i - 1),offset + i);
	            buf.push(chr);
	        }
	        return [buf.length, buf.join('')];
	    };
	    
	    var _unserialize = function (data, offset){
	        if(!offset) offset = 0;
	        var buf = [];
	        var dtype = (data.slice(offset, offset + 1)).toLowerCase();
	        
	        var dataoffset = offset + 2;
	        var typeconvert = new Function('x', 'return x');
	        var chrs = 0;
	        var datalength = 0;
	        
	        switch(dtype){
	            case "i":
	                typeconvert = new Function('x', 'return parseInt(x)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "b":
	                typeconvert = new Function('x', 'return (parseInt(x) == 1)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "d":
	                typeconvert = new Function('x', 'return parseFloat(x)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "n":
	                readdata = null;
	            break;
	            case "s":
	                var ccount = read_until(data, dataoffset, ':');
	                var chrs = ccount[0];
	                var stringlength = ccount[1];
	                dataoffset += chrs + 2;
	                
	                var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 2;
	                if(chrs != parseInt(stringlength) && chrs != readdata.length){
	                    error('SyntaxError', 'String length mismatch');
	                }
	            break;
	            case "a":
	                var readdata = {};
	                
	                var keyandchrs = read_until(data, dataoffset, ':');
	                var chrs = keyandchrs[0];
	                var keys = keyandchrs[1];
	                dataoffset += chrs + 2;
	                
	                for(var i = 0;i < parseInt(keys);i++){
	                    var kprops = _unserialize(data, dataoffset);
	                    var kchrs = kprops[1];
	                    var key = kprops[2];
	                    dataoffset += kchrs;
	                    
	                    var vprops = _unserialize(data, dataoffset);
	                    var vchrs = vprops[1];
	                    var value = vprops[2];
	                    dataoffset += vchrs;
	                    
	                    readdata[key] = value;
	                }
	                
	                dataoffset += 1;
	            break;
	            default:
	                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
	            break;
	        }
	        return [dtype, dataoffset - offset, typeconvert(readdata)];
	    };
	    return _unserialize(data, 0)[2];
	},
	
	plugin: function (plugin_name) {
		this.plugin_name = null;
		this.xml = null;
		this.version = null;
		this.url = null;
		this.preference = {};
	}

};


