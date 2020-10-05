// "use strict";

$(document).ready(function () {
  $('#ImportButton').click(function () {
    $('textarea#json_box').val("");
    $('.json-box #SubmitButton').css('display', 'block');
    $('.json-box .input-group').css('display', 'flex');
    $('.json-box').css('display', 'flex');
  });
  $('#ExportButton').click(function () {
    $('textarea#json_box').val(window.formBuilder.generateExportData());
    $('.json-box #SubmitButton').css('display', 'none');
    $('.json-box .input-group').css('display', 'none');
    $('.json-box').css('display', 'flex');
  });
  $('.json-box').click(function (e) {
    if (e.target.className === 'json-box') {
      $('.json-box').css('display', 'none');
    }
  });
  $('#SubmitButton').click(function () {
    var $text = $('#json_box').val();
    window.formBuilder = new JsonFormBuilder($text, {
      price_multiplier: $('#price_multiplier').val(),
      price_multiplier_mode: $('#price_multiplier_mode').val(),
      compare_multiplier: $('#compare_multiplier').val(),
      compare_multiplier_mode: $('#compare_multiplier_mode').val(),
      changeShippingFunction: function changeShippingFunction(callback) {
        callback(2.33, "China", "FedEx");
      }
    });
    $('.json-box').css('display', 'none');
  });

  window.rushModalConfirm = function (options) {
    if (options['width'] != '') {
      style = 'min-width: ' + options['width'] + ';';
    }

    if ("buttons" in options) {
      if (options['buttons']['ok'] == '') {
        rushButtonOK = 'Ok';
      } else {
        rushButtonOK = options['buttons']['ok'];
      }

      if (options['buttons']['cancel'] == '') {
        rushButtonCancel = 'Cancel';
      } else {
        rushButtonCancel = options['buttons']['cancel'];
      }
    } else {
      rushButtonOK = 'Ok';
      rushButtonCancel = 'Cancel';
    }

    if ("id" in options) {
      dialogid = options['id'];
    } else {
      dialogid = 'RushModal';
    }

    xclose = '<button type="button" class="close" data-dismiss="modal" id="' + dialogid + '_close">&times;</button>';
    backdrop = true;
    keyboard = true;
    bCancel = '<button type="button" class="btn btn-secondary bsModalCallback" data-dismiss="modal" data-result="Cancel" id="' + dialogid + '_cancel_btn">' + rushButtonCancel + '</button>';
    bOk = '<button type="button" class="btn btn-default bsModalCallback ladda-button" data-result="Ok" id="' + dialogid + '_ok_btn">' + rushButtonOK + '</button>';

    if ("closable" in options) {
      if (options['closable'] == false) {
        xclose = '';
        backdrop = 'static';
        keyboard = false;
        bCancel = '';
      }
    }

    str = '<div class="modal" id="' + dialogid + '">' + '<div class="modal-dialog modal-dialog-centered" style="' + style + '" >' + '<div class="modal-content">' + '<div class="modal-header">' + '<h4 class="modal-title">' + options["title"] + '</h4>' + xclose + '</div>' + '<div class="modal-body">' + options["content"] + '</div>' + '<div class="modal-footer">' + bCancel + bOk + '</div>' + '</div>' + '</div>' + '</div>';
    $('html').append(str);
    $("#" + dialogid).modal({
      backdrop: backdrop,
      keyboard: keyboard
    });
    $("#" + dialogid).off('hidden.bs.modal').on('hidden.bs.modal', function () {
      //	console.log('close->'+dialogid);
      $("#" + dialogid).remove();
    });
    $(document).off('click', "#" + dialogid + " .bsModalCallback").on('click', "#" + dialogid + " .bsModalCallback", function (e) {
      if ("callback" in options) {
        options["callback"]($(this).attr("data-result"));
      }
    });

    if ("onShown" in options) {
      options["onShown"]();
    }
  };
});