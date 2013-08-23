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
  });

  var getPartyId = function () {
    return $('#pt-info-body').data('pt-id');
  }

  var loadNotes = function () {
    var partyId = getPartyId();
    $.ajax({
      url: '/parties/' + partyId + '/notes',
      type: 'GET',
      success: function (res) {
        if (res.success) {
          var notes = res.notes;
          for (var i = 0; i < notes.length; i++) {
            var data = {
              username: notes[i].username,
              note: notes[i]
            }
            var html = new EJS({url: '/parties/note-block.ejs'}).render(data);
            $('#pt-notes').append(html);
          }
        } else {
          console.log(res.errors);
        }
      }
    });
  }();
});