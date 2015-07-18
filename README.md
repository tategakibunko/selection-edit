## Summary

Insert or wrap text to selected range in form elements.

## Usage

```javascript
var textarea = document.querySelector("textarea#input");

var hello_button = document.querySelector("button#insert-hello");
hello_button.onclick = function(){
  textarea.value = new SelectionEdit(textarea).insertText("hello!");
};

var bold_button = document.querySelector("button#to-bold");
bold_button.onclick = function(){
  textarea.value = new SelectionEdit(textarea).wrapText("<b>", "</b>");
};
```

## License

MIT.
