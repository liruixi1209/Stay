//CKEDITOR.plugins.add('insertcode', 
//{ 
//init: function(editor) 
//{ 
//var pluginName = 'insertcode'; 
//CKEDITOR.dialog.add(pluginName, this.path + 'insertcode.js'); 
//editor.config.flv_path = editor.config.flv_path || (this.path); 
//editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName)); 
//editor.ui.addButton('insertcode', 
//{ 
//label: '插入代码', 
//command: pluginName, 
//icon:this.path+"images/insertcode.gif" 
//}); 
//} 
//});

CKEDITOR.plugins.add('insertcode', {
    requires : ['dialog'],
    init : function(editor) {
        editor.addCommand('insertcode', new CKEDITOR.dialogCommand('insertcode'));
        editor.ui.addButton('insertcode', {
                    label :'插入代码',
                    command : 'insertcode',
                    icon : this.path + 'images/insertcode.gif'
                });
        CKEDITOR.dialog.add('insertcode', this.path + 'dialogs/insertcode.js');        
    }
});