// url: https://github.com/tategakibunko/selection-edit
// license: MIT
var SelectionEdit = (function(){
  var _is_ie = (function(ua){
    return ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1;
  })(window.navigator.userAgent.toLowerCase());

  var _get_selected_range = function(obj){
    if(_is_ie){
      obj.focus();
      var range = document.selection.createRange();
      var clone = range.duplicate();
      
      clone.moveToElementText(obj);
      clone.setEndPoint('EndToEnd', range);
      return {
	start:(clone.text.length - range.text.length),
	end:(clone.text.length - range.text.length + range.text.length)
      };
    }
    if(window.getSelection()){
      return {
	start:obj.selectionStart,
	end:obj.selectionEnd
      };
    }
    return {};
  };

  function SelectionEdit($dom){
    this.$dom = $dom;
    this.$dom.focus();
    this.range = _get_selected_range(this.$dom);
  }

  SelectionEdit.prototype = {
    isSelected : function(){
      var start = this.range.start || 0;
      var end = this.range.end || 0;
      return start !== end;
    },
    getBeforeText : function(){
      return this.$dom.value.slice(0, this.range.start);
    },
    getRangeText : function(){
      return this.$dom.value.slice(this.range.start, this.range.end);
    },
    getAfterText : function(){
      return this.$dom.value.slice(this.range.end);
    },
    insertText : function(text){
      return (
	this.getBeforeText() +
	text +
	this.getAfterText()
      );
    },
    wrapText : function(start, end){
      return (
	this.getBeforeText() +
	start +
	this.getRangeText() +
	end +
	this.getAfterText()
      );
    }
  };

  return SelectionEdit;
})();
