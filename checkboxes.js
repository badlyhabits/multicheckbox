;(function($, window, document, undefined){
  "use strict";

  function MultiCB(elem, options) {
    var that = this;
    that.options = $.extend({}, $.fn.multicheckbox.defaults, options);
    that.elem = elem;
    that.$elem = $(elem);
    that.multicb = that.$elem.find("input[type='checkbox']");
    that.list = $("." + that.$elem.data(that.options.data_attr_name));
    that.list_items = that.list.find("input[type='checkbox']");
    that.add_events();
  }

  MultiCB.prototype.add_events = function() {
    var that = this,
        $elem = that.$elem,
        multicb = that.multicb,
        items = that.list_items,
        list = that.list,
        list_len = items.length,
        checked_items_len;

    multicb.on("change", function(e) {
      multicb.prop("checked") === true ? items.prop("checked", true) : items.prop("checked", false);
      $elem.removeClass("is-partial");
    });

    list.on("change", items, function(e) {
      checked_items_len = list.find(":checked").length;
      multicb.prop("checked", checked_items_len === list_len);
      (checked_items_len > 0 && checked_items_len < list_len) ? $elem.addClass("is-partial") : $elem.removeClass("is-partial");
    });
  };

  $.fn.multicheckbox = function(options) {
    return this.each(function() {
      if (!$.data(this, "multi-checkbox")) {
          $.data(this, "multi-checkbox", new MultiCB(this, options));
      }
    });
  };

  $.fn.multicheckbox.defaults = {
    partial_cssclass: "is-partial",
    data_attr_name: "checks-list"
  };


})(jQuery, window, document);

$(function() {
  $(".ff-check-multi").multicheckbox();
});

