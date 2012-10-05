/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module help
 **//**
 * This is an goorm code generator.  
 * goorm starts with this code generator.
 * @class installNewPlugin
 * @extends help
 **/org.goorm.core.help.installNewPlugin=function(){this.dialog=null,this.buttons=null,this.tabView=null,this.treeView=null,this.num=0},org.goorm.core.help.installNewPlugin.prototype={init:function(){var e=this,t=function(){this.hide()},n=function(){this.hide()};this.buttons=[{text:"OK",handler:t,isDefault:!0},{text:"Cancel",handler:n}],this.dialog=new org.goorm.core.help.installNewPlugin.dialog,this.dialog.init({title:"Install New Plugins",path:"configs/dialogs/org.goorm.core.help/help.installNewPlugin.html",width:600,height:400,modal:!0,yesText:"OK",noText:"Close",buttons:this.buttons,success:function(){e.pluginsAddButton=new YAHOO.widget.Button("pluginsAddButton"),e.selectAll=new YAHOO.widget.Button("selectAll"),e.deselectAll=new YAHOO.widget.Button("deselectAll"),e.btInstallNewPlugin=new YAHOO.widget.Button("btInstallNewPlugin"),$("#divInstallNewPlugins #btInstallNewPlugin").click(function(){core.loadingBar.startLoading("Install new plugins..."),e.num=0,$("#divInstallNewPluginList input:checkbox:checked").each(function(){e.num++}),$("#divInstallNewPluginList input:checkbox:checked").each(function(){var t=$(this).val();setTimeout(function(){e.installPlugin(t)},10)})}),$("#divInstallNewPlugins #selectAll").click(function(){$("#divInstallNewPluginList input:checkbox").each(function(){$(this).attr("checked","checked")})}),$("#divInstallNewPlugins #deselectAll").click(function(){$("#divInstallNewPluginList input:checkbox").each(function(){$(this).attr("checked","")})}),$("#divInstallNewPlugins #selectbox").change(function(){var e=null,t=$(this).val();t!=""&&(core.loadingBar.startLoading("Loading, Please wait..."),$.ajax({type:"POST",data:"path="+t,url:"file/get_url_contents",success:function(t){e=$.parseXML(t),$("#divInstallNewPluginList").html(""),$(e).find("xml").each(function(){$(this).find("plugin").each(function(){$("#divInstallNewPluginList").append('<input type="checkbox" name="'+$(this).attr("name")+'" value="'+$(this).attr("url")+'"> '+$(this).attr("name")+"<br>")})}),core.loadingBar.stopLoading()},error:function(e,t,n){console.log(n)}}))})}}),this.dialog=this.dialog.dialog},show:function(){var e=this;this.dialog.panel.show()},installPlugin:function(e){var t=this,n=e;$.ajax({url:"plugin/install",type:"POST",data:"path="+n,success:function(e){t.num--,t.num==0&&(alert.init({title:"Install new plugins",message:e,imageURL:""}),alert.panel.show(),core.loadingBar.stopLoading())},error:function(e,t,n){alert.show(core.localization.msg.alertError+n)}})}};