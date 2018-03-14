//
// 
//CKEDITOR.dialog.add('insertcode', function(editor){ 
//var escape = function(value){return value;}; 
//return{ 
//title: '插入代码', 
//resizable: CKEDITOR.DIALOG_RESIZE_BOTH, 
//minWidth: 720, 
//minHeight: 520, 
//contents: [{ 
//id: 'cb', 
//name: 'cb', 
//label: 'cb', 
//title: 'cb', 
//elements: [{ 
//type: 'select', 
//label: '语言', 
//id: 'lang', 
//required: true, 
//'default': 'csharp', 
//items: [ ['CSS', 'css'],['JavaScript', 'js'], ['Java', 'java'], ['PHP', 'php'], ['SQL', 'sql'], ['XML', 'xml']] 
//}, { 
//type: 'textarea', 
//style: 'width:718px;height:450px', 
//label: '代码', 
//id: 'code', 
//rows: 31, 
//'default': '' 
//}] 
//}], 
//onOk: function(){ 
//code = this.getValueOf('cb', 'code'); 
//lang = this.getValueOf('cb', 'lang'); 
//html = '' + escape(code) + ''; 
//editor.insertHtml("<pre class=\"brush:" + lang + ";\">" + html + "</pre>"); 
//}, 
//onLoad: function(){} 
//}; 
//}); 
// JavaScript Document
CKEDITOR.dialog.add('insertcode', function(editor){  
    var escape = function(value){
        value=value.replace(/(<)/g,"&lt;");
        value=value.replace(/(>)/g,"&gt;");        
        return value;  
    };  
    return {  
        title: "插入代码",  
        resizable: CKEDITOR.DIALOG_RESIZE_BOTH,  
        minWidth: 600,  
        minHeight: 400,         
        contents: [{  
            id: 'cb',  
            name: 'cb',  
            label: 'cb',  
            title: 'cb',  
            elements: [
                {  
                    type: 'select',  
                    style: 'width:100%;height:25px;margin-bottom:10px',
                    label: "语言",  
                    id: 'lang',  
                    required: true,  
                    'default': 'css',  
                    items: [
                            ['CSS', 'css'],
                            ['Html', 'xhtml'],
                            ['JavaScript', 'js'],
                            ['Java', 'java'],
                            ['PHP', 'php'],
                            ['SQL', 'sql'],
                            ['XML', 'xml']
                    ]  
                },
                {  
                    type: 'textarea',                    
                    label: "源码",  
                    id: 'code',  
                    rows: 20 ,
                    style: 'width:100%;margin-top:5px;'
                }
            ]  
        }],  
        onOk: function(){  
            var code = this.getValueOf('cb', 'code');  
            var lang = this.getValueOf('cb', 'lang');
            //代码文本输入区域为空，则不进行添加
            if(code.replace(/^\s*|\s*$/g,'')!=""){
                var html ="<pre class=\"brush:" + lang + ";\">";
                html+=escape(code);  
                html+="</pre>";
                editor.insertHtml(html);
            }
        },  
        onLoad: function(){             
        }  
    };  
});


//源码高亮的代码
//highLighter:function(){
//    var hiLighter=false;
//    var syntaxDIR="/source/syntaxhighlighter_3.0.83/";        
//    if($("pre").length>0){
//        hiLighter=true;
//        $("head").append('<script type="text/javascript" src="'+syntaxDIR+'scripts/shCore.js"></script>');            
//        $("head").append('<script src="'+syntaxDIR+'scripts/shAutoloader.js" type="text/javascript"></script>');
//        $("head").append('<link type="text/css" rel="stylesheet" href="'+syntaxDIR+'styles/shCoreDefault.css"/>');
//        var path=function(){
//          var args = arguments,result = [];
//                
//          for(var i = 0; i < args.length; i++)
//              result.push(args[i].replace('@', syntaxDIR+'scripts/'));
//                
//          return result
//        };
//        SyntaxHighlighter.autoloader.apply(null, path(
//          'applescript            @shBrushAppleScript.js',
//          'actionscript3 as3      @shBrushAS3.js',
//          'bash shell             @shBrushBash.js',
//          'coldfusion cf          @shBrushColdFusion.js',
//          'cpp c                  @shBrushCpp.js',
//          'c# c-sharp csharp      @shBrushCSharp.js',
//          'css                    @shBrushCss.js',
//          'delphi pascal          @shBrushDelphi.js',
//          'diff patch pas         @shBrushDiff.js',
//          'erl erlang             @shBrushErlang.js',
//          'groovy                 @shBrushGroovy.js',
//          'java                   @shBrushJava.js',
//          'jfx javafx             @shBrushJavaFX.js',
//          'js jscript javascript  @shBrushJScript.js',
//          'perl pl                @shBrushPerl.js',
//          'php                    @shBrushPhp.js',
//          'text plain             @shBrushPlain.js',
//          'py python              @shBrushPython.js',
//          'ruby rails ror rb      @shBrushRuby.js',
//          'sass scss              @shBrushSass.js',
//          'scala                  @shBrushScala.js',
//          'sql                    @shBrushSql.js',
//          'vb vbnet               @shBrushVb.js',
//          'xml xhtml xslt html    @shBrushXml.js'
//        ));                        
//    }
//    if(hiLighter)
//        SyntaxHighlighter.all();
//}