# jquery-textareaPreview

A jQuery plugin to add realtime preview panel to textareas, similar to StackOverflow edit interface.
It allows to create a basic editor with preview, for example in comment form.


## Example usage
    
    <script src="jquery.textareaPreview.js"></script>
    
    <textarea name="text"></textarea>
    
    <script>
        $(function() {
            var $textarea = $("textarea[name='text']");
            $textarea.textareaPreview();
        });
    </script>
    
This will add a preview panel right below the textarea element. When you type some HTML into the
textarea it's rendered inside the preview panel.


## Options

You can provide additional options to the `textarePreview()` method.

### `container` (default: `null`)

Selector string or jQuery object which is used as a preview panel. If it's not specified then empty `<div>`
is created and inserted right after the textarea. 

Example:

    <textarea name="text"></textarea>
    <div id="preview"></div>
    
    <script>
        $(function() {
            $("textarea").textareaPreview({
                container: #preview"    // or container: $("#preview)
            });
        });
    </script>
    
### `containerClass`  (default: `"preview"`)

A CSS class which is added to preview panel. Note it's added only if the panel created automatically (i.e. `container` option is `null`).

Example:

    <textarea name="text"></textarea>

    <script>
        $(function() {
            $("textarea").textareaPreview({
                containerClass: "myPreview"
            });
        });
    </script>

This will add `<div class="myPreview"></div>` after the textarea which will be used as preview panel.

### `enabled` (default: `true`)

Whether the preview is enabled when the plugin is initialized.

Example:

    <script>
        $(function() {
            $("textarea").textareaPreview({
                enabled: false
            });
        });
    </script>
    
This will add a preview panel but it will be disabled by default. To enable it you should call the `.textareaPreview("enable")` method manually (see "Advanced Usage").

### `preprocess` (default: `null`)

A function to pre-process the text before it's displayed in the preview. By default the text is inserted without any changes.
This is a good place to call some markup processors, for example Markdown.

Example:

    <script>
        $(function() {
            $("textarea").textareaPreview({
                preprocess: function(text) {
                    return convertMarkdownToHTML(text);
                }
            });
        });
    </script>

### `updateInterval` (default: `100`)

A time interval between preview updates (in milliseconds). Well, the preview is not truly realtime :-)

    <textarea name="text"></textarea>

    <script>
        $(function() {
            $("textarea").textareaPreview({
                updateInterval: 1000    // the preview is updated every second
            });
        });
    </script>


## Advanced usage

You can call `enable` or `disable` methods to enable or disable the preview panel.

Example:

    <textarea name="text"></textarea>
    <a href="#" id="enable-preview">Enable preview</a>
    <a href="#" id="disable-preview">Disable preview</a>

    <script>
        $(function() {
            var $textarea = $("textarea").textareaPreview({
                enabled: false
            });
            $("#enable-preview").click(function(e) {
                e.preventDefault();
                $textarea.textareaPreview("enable");
            });
            $("#disable-preview").click(function(e) {
                e.preventDefault();
                $textarea.textareaPreview("disable");
            });
        });
    </script>


## Feedback

You can report bugs or propose improvements on [GitHub project page](https://github.com/andreyfedoseev/jquery-textareaPreview)