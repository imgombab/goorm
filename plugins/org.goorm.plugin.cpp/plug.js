/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.plugin.cpp=function(){this.name="c",this.mainmenu=null,this.build_options=null,this.build_source=null,this.build_target=null,this.build_file_type="o",this.debug_con=null,this.current_debug_project=null,this.terminal=null},org.goorm.plugin.cpp.prototype={init:function(){this.addProjectItem(),this.mainmenu=core.module.layout.mainmenu,this.cErrorFilter=/[A-Za-z]* error: [A-Za-z0-9 '",:_\\\/\.\+\-\*\#\@]*/,this.cWarningFilter=/[A-Za-z]* warning: [A-Za-z0-9 '",:_\\\/\.\+\-\*\#\@]*/,this.lineFilter=/:[0-9]*:/,this.add_mainmenu()},addProjectItem:function(){$("div[id='project_new']").find(".project_types").append("<div class='project_wizard_first_button' project-type='cpp'><div class='project_type_icon'><img src='/org.goorm.plugin.cpp/images/cpp.png' class='project_icon' /></div><div class='project_type_title'>C/C++ Project</div><div class='project_type_description'>C/C++ Project using GNU Compiler Collection</div></div>"),$("div[id='project_new']").find(".project_items").append("<div class='project_wizard_second_button all cpp' description='  Create New Project for C' projecttype='cpp'><img src='/org.goorm.plugin.cpp/images/cpp_console.png' class='project_item_icon' /><br /><a>C/C++ Console Project</a></div>"),$(".project_dialog_type").append("<option value='cpp'>C/C++ Projects</option>")},add_mainmenu:function(){var e=this;$("ul[id='plugin_new_project']").append('<li class="yuimenuitem"><a class="yuimenuitemlabel" href="#" action="new_file_cpp" localizationKey=\'file_new_cpp_project\'>C/C++ Project</a></li>'),this.mainmenu.render()},add_menu_action:function(){$("a[action=new_file_cpp]").unbind("click"),$("a[action=new_file_cpp]").click(function(){core.dialog.new_project.show(),$(".project_wizard_first_button[project-type=cpp]").trigger("click"),$("#project_new").find(".project_types").scrollTop($(".project_wizard_first_button[project-type=cpp]").position().top-100)})},new_project:function(e){var t={plugin:"org.goorm.plugin."+e.project_type,data:e};$.get("/plugin/new",t,function(e){core.module.layout.project_explorer.refresh()})},run:function(e){var t=this;this.path_project="";var n="main",r="./"+n;console.log(r),core.module.layout.terminal.send_command(r+"\r")},debug:function(e){var t=this,n=core.module.debug.table_variable,r=core.module.debug;this.terminal=core.module.layout.workspace.window_manager.open("/","debug","terminal","Terminal").terminal,this.current_debug_project=e,n.initializeTable(),n.refreshView();var i={plugin:"org.goorm.plugin.cpp",path:e,mode:"init"};this.terminal.index!=-1?t.debug_cmd(i):$(this.terminal).one("terminal_ready",function(){t.debug_cmd(i)}),this.status_updated=!1,this.data_buffer=null,this.debug_buffer=null,this.timeouts=[];var s={started:!1,terminated:!1,connected:!1,prompt:!1};$(core.module.debug).off("terminal_msg"),$(core.module.debug).on("terminal_msg",function(r,i){var o=/\(gdb\)/,u=/where/,a=/info locals/;/Program exited normally/.test(i)?s.terminated=!0:/[\. ]*done/.test(i)?s.connected=!0:o.test(i)&&(s.prompt=!0);if(s.terminated){t.terminal.send_command("quit\r"),n.initializeTable(),n.refreshView();while(t.timeouts.length>0)clearTimeout(t.timeouts.pop());var f=core.module.layout.workspace.window_manager.window;for(var l in f){var c=f[l];c.editor&&c.editor.clear_highlight()}s.terminated=!1}else if(!s.started&&s.connected&&s.prompt)t.debug_cmd({mode:"run",project_path:e}),s.started=!0;else if(s.started&&t.status_updated===!1&&s.prompt){var h=setTimeout(function(){t.terminal.send_command("where\r")},150),p=setTimeout(function(){t.terminal.send_command("info locals\r")},300);t.timeouts.push(h),t.timeouts.push(p),t.status_updated=!0}if(o.test(i)){if(t.debug_buffer!=null){var d=t.debug_buffer.split("\n"),v=null;$.each(d,function(e,r){if(r=="")return;if(u.test(r))v=1;else if(v==1){var i=/#\d .* (.*):(\d+)/;if(i.test(r)){var s=r.match(i),o=s[1],f=s[2],l=core.module.layout.workspace.window_manager.window;for(var e in l){var c=l[e];c.project==t.current_debug_project&&c.filename==o&&c.editor.highlight_line(f)}}}if(a.test(r))v=2,n.initializeTable();else if(v==2){var h=r.split(" = ");h.length==2&&n.addRow({variable:h[0].trim(),value:h[1].trim()})}}),n.refreshView()}t.debug_buffer=i}else t.debug_buffer+="\n"+i}),$(r).off("value_changed"),$(r).on("value_changed",function(e,n){t.terminal.send_command("p "+n.variable+"="+n.value+"\r")})},debug_cmd:function(e){var t=this;if(this.terminal===null){console.log("no connection!");return}this.status_updated=!1;var n=core.module.layout.workspace.window_manager.window;for(var r in n){var i=n[r];if(i.project==this.current_debug_project){var s=i.filename;if(!i.editor)continue;var o=i.editor.breakpoints;if(o.length>0)for(var r=0;r<o.length;r++){var u=o[r];u+=1,u=s+":"+u,t.terminal.send_command("break "+u+"\r")}else this.status_updated=!0}}switch(e.mode){case"init":t.terminal.send_command("gdb main\r");break;case"run":t.terminal.send_command("run\r");break;case"continue":t.terminal.send_command("continue\r");break;case"terminate":t.terminal.send_command("quit\r"),table_variable.initializeTable(),table_variable.refreshView(),t.status_updated=!0;break;case"step_over":t.terminal.send_command("next\r");break;case"step_in":t.terminal.send_command("step\r");break;case"step_out":t.terminal.send_command("finish\r");break;default:}},build:function(e,t,n){var r=this;this.path_project="";var i="-g",s="main.c",o="main",u="gcc "+s+" -o "+this.path_project+o+" -Wall"+" "+i;console.log(u),core.module.layout.terminal.send_command(u+"\r"),n&&n()},clean:function(){console.log("cpp clean")}};