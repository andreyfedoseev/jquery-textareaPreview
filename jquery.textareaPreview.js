/*

jquery-textareaPreview
----------------------
Copyright (c) 2011 Andrey Fedoseev <andrey.fedoseev@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function($) {

    var PLUGIN_NAME = "textareaPreview";

    var settings = {
        "container" : null,
        "containerClass": "preview",
        "updateInterval": 100,
        "preprocess": null,
        "enabled": true
    };

    var methods = {
        "init": function(options) {
            if (options) {
                options = $.extend({}, settings, options);
            } else {
                options = $.extend({}, settings);
            }
            var $textareas = this.each(function() {
                var $this = $(this);
                var data = $this.data(PLUGIN_NAME);
                if (!data) {
                    var $container = null;
                    if (options.container && $(options.container).length) {
                        $container = $(options.container);
                    } else {
                        $container = $("<div></div>").addClass(options.containerClass).insertAfter($this);
                    }
                    $this.data(PLUGIN_NAME, {
                        container: $container,
                        updateInterval: options.updateInterval,
                        preprocess: options.preprocess,
                        textChanged: false
                    });
                }
            });
            if (options.enabled) {
                methods["enable"].apply($textareas);
            }
            return $textareas;
        },
        "enable": function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(PLUGIN_NAME);

                data.enabled = true;
                data.textChanged = true;
                $this.data(PLUGIN_NAME, data);

                $this.bind("keyup." + PLUGIN_NAME, function() {
                    var data = $this.data(PLUGIN_NAME);
                    data.textChanged = true;
                    $this.data(PLUGIN_NAME, data);
                });

                var update_preview = function() {
                    var data = $this.data(PLUGIN_NAME);
                    if (!data.enabled) {
                        return;
                    }
                    if (data.textChanged) {
                        var text = $this.val();
                        if (data.preprocess) {
                            text = data.preprocess(text);
                        }
                        data.container.html(text);
                        data.textChanged = false;
                        $this.data(PLUGIN_NAME, data);
                    }
                    setTimeout(update_preview, data.updateInterval);
                };

                data.container.show();

                update_preview();
            });
        },
        "disable": function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(PLUGIN_NAME);

                data.enabled = false;
                $this.data(PLUGIN_NAME, data);

                $this.unbind("keyup." + PLUGIN_NAME);

                data.container.hide();
            });
        }
    };

    $.fn[PLUGIN_NAME] = function(method) {

        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + PLUGIN_NAME);
        }

    };
})(jQuery);
