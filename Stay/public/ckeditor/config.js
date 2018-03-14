/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	config.filebrowserImageUploadUrl= "../public/statusPhoto";
	config.filebrowserWindowWidth = '1000';
	config.filebrowserWindowHeight = '700';
	config.disableNativeSpellChecker = false;
	config.scayt_autoStartup = false;
	config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋;华文中宋/华文中宋;楷体/楷体;华文行楷/华文行楷;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;方正舒体/方正舒体;方正姚体/方正姚体;' + config.font_names;
	//默认的字体名 plugins/font/plugin.js
	config.font_defaultLabel = '宋体';
	config.fontSize_defaultLabel = '五号';
	config.fontSize_sizes = '初号/42pt;小初/36pt;一号/26pt;小一/24pt;二号/22pt;小二/18pt;三号/16pt;小三/15pt;四号/14pt;小四/12pt;五号/10.5pt;小五/9pt;六号/7.5pt;小六/6.5pt;七号/5.5pt;八号/5pt;' + config.fontSize_sizes;
	config.fontSize_style = {
		element : 'span',
		styles : {
			'font-size' : '#(size)'
		},
		overrides : [ {
			element : 'font',
			attributes : {
				'size' : null
			}
		} ]
	};

	config.extraPlugins = 'insertcode'; 
};
