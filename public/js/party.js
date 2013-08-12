$(document).ready(function () {
  $('#pt-list td a .icon-remove').click(function () {
    var self = $(this);
    $.ajax({
      url: self.data('url'),
      type: 'DELETE',
      data: {
        _csrf: self.data('csrf')
      },
      success: function (res) {
        if (res.success) {
          self.parents('tr').remove();
        } else {
          alert('Delete unsuccessfull!')
        }
      }
    });
    //return false;
  });
});