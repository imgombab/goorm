/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.core.file._export=function(){this.dialog=null,this.buttons=null,this.tabview=null,this.dialog_explorer=null},org.goorm.core.file._export.prototype={init:function(){var e=this,t=function(){var t=e.dialog_explorer.get_data();if(t.path==""||t.name=="")return alert.show("Not Selected."),!1;var n={user:core.user.first_name+"_"+core.user.last_name,path:t.path,file:t.name};$.get("file/export",n,function(t){if(t.err_code==0){e.dialog.panel.hide();var n={file:t.path};location.href="download/?file="+t.path}else alert.show(t.message)})},n=function(){this.hide()};this.buttons=[{text:"OK",handler:t,isDefault:!0},{text:"Cancel",handler:n}],this.dialog=new org.goorm.core.file._export.dialog,this.dialog.init({title:"Export File",path:"configs/dialogs/org.goorm.core.file/file._export.html",width:800,height:500,modal:!0,yes_text:"Open",no_text:"Cancel",buttons:this.buttons,success:function(){var e=new YAHOO.util.Resize("file_export_dialog_left",{handles:["r"],minWidth:200,maxWidth:400});e.on("resize",function(e){var t=$("#file_export_dialog_middle").width(),n=e.width;$("#file_export_dialog_center").css("width",t-n-9+"px")})}}),this.dialog=this.dialog.dialog,this.dialog_explorer=new org.goorm.core.dialog.explorer},show:function(){var e=this;e.dialog_explorer.init("#file_export",!1),this.dialog.panel.show()}};