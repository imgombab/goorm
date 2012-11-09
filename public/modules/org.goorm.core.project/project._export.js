/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v3 License:
 * http://www.goorm.io/intro/License
 * project_name : goormIDE
 * version: 1.0.0
 **/

org.goorm.core.project._export = function () {
	this.dialog = null;
	this.buttons = null;
	this.tabview = null;
	this.project_list = null;
};

org.goorm.core.project._export.prototype = {
	init: function () { 
	
		var self = this;
		
		var handle_ok = function() { 

			var data = self.project_list.get_data();

			if(data.path=="" || data.name=="") {
				alert.show(core.module.localization.msg["alert_filename_empty"]);
				// alert.show("Project item is not selected");
				return false;
			}

			var postdata = {
				user: core.user.first_name+"_"+core.user.last_name,
				project_path: data.path,
				project_name: data.name,
				export_type: $("#project_export_datatype option:selected").text()
			};
								
			$.get("project/export", postdata, function (data) {
				if (data.err_code == 0) {
					self.dialog.panel.hide();
					
					var downloaddata = {
						file: data.path	
					};
					
					location.href = "download/?file="+data.path;
				}
				else {
					alert.show(data.message);
				}
			});
			
		};

		var handle_cancel = function() { 
			
			this.hide(); 
		};
		
		this.buttons = [ {text:"<span localization_key='ok'>OK</span>", handler:handle_ok, isDefault:true},
						 {text:"<span localization_key='cancel'>Cancel</span>",  handler:handle_cancel}]; 
						 
		this.dialog = new org.goorm.core.project._export.dialog();
		this.dialog.init({
			title:"Export", 
			path:"configs/dialogs/org.goorm.core.project/project._export.html",
			width:800,
			height:500,
			modal:true,
			yes_text:"<span localization_key='open'>Open</span>",
			no_text:"<span localization_key='cancel'>Cancel</span>",
			buttons:this.buttons,
			success: function () {
				var resize = new YAHOO.util.Resize("project_export_dialog_left", {
		            handles: ['r'],
		            minWidth: 250,
		            maxWidth: 400
		        });
				
		        resize.on('resize', function(ev) {
					var width = $("#project_export_dialog_middle").width();
		            var w = ev.width;
		            $("#project_export_dialog_center").css('width', (width - w - 9) + 'px');
		        });
			}
		});
		this.dialog = this.dialog.dialog;
		
		this.project_list = new org.goorm.core.project.list;
	},

	show: function () {
		this.project_list.init("#project_export");
		this.dialog.panel.show();
	}
};