/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.core.help.bug_report=function(){this.dialog=null,this.buttons=null,this.tabview=null,this.treeview=null},org.goorm.core.help.bug_report.prototype={init:function(){var e=this,t=function(){var e=this;if($("#bug_reports_title").val()=="")return alert.show(core.module.localization.msg.alertTitleEmpty),!1;if($("#bug_reports_author").val()=="")return alert.show(core.module.localization.msg.alertAuthorEmpty),!1;if($("#bug_reports_email").val()=="")return alert.show(core.module.localization.msg.alertEmailEmpty),!1;if($("#bug_reports_version").val()=="")return alert.show(core.module.localization.msg.alertVersionEmpty),!1;if($("#bug_reports_module").val()=="")return alert.show(core.module.localization.msg.alertModuleEmpty),!1;if($("#bug_reports_content").val()=="")return alert.show(core.module.localization.msg.alertContentsEmpty),!1;var t=new Date,n={mid:"bug_report",document_srl:"",title:$("#bug_reports_title").val(),allow_comment:"Y",allow_trackback:"N",nick_name:$("#bug_reports_author").val(),password:t.getMinutes()+t.getSeconds(),act:"procBoardInsertDocument",module:"board",email_address:$("#bug_reports_email").val(),extra_vars1:$("#bug_reports_version").val(),extra_vars2:$("#bug_reports_module").val(),content:$("#bug_reports_content").val()};$.post("",n,function(t){$(t).find("h1").text()=="success"?(notice.show(core.module.localization.msg.noticeWriteDone),e.hide()):(alert.show(core.module.localization.msg.alertCannotWrite),e.hide())})};this.buttons=[{text:"Send",handler:t,isDefault:!0}],this.dialog=new org.goorm.core.help.about.dialog,this.dialog.init({title:"Send Bug Report",path:"configs/dialogs/org.goorm.core.help/help.bug_report.html",width:620,height:550,modal:!0,buttons:this.buttons,success:function(){}}),this.dialog=this.dialog.dialog},show:function(){$("#bug_reports_author").val(core.user.first_name+"_"+core.user.last_name),$("#bug_reports_title").val(""),$("#bug_reports_email").val(""),$("#bug_reports_version").val(core.env.version),$("#bug_reports_module").val(""),$("#bug_reports_content").val(""),this.dialog.panel.show()}};