// Remove and add some HTML when user is authenticated or not
$(function() {
  $.get('/api/user', function(response) {
    if(!response.username) {
      $('.logged-display').remove()
    }
    if(response.username) {
      $('.non-logged-display').remove()
      $('#nav').append('<li><a href="/forms" class="navlink px-2 link-secondary text-decoration-none">Formulários</a></li>')
      $('#log_bttns').append("<form id='logout_bttn' action='/logout' method='post'></form>")
      $('#logout_bttn').append("<button type='submit' class='btn btn-outline-primary me-2'>Sair</button>")
    }
  })
})

// create-form PAGE

// diplay of form title options/buttons
$(function() {
  $('#form_name_check').hide()
  $('#form_name_input').hide()

  //display the default input value on form title
  var formNameVal = $('[name = form_name_input]').val()
  $('#form_title').text(formNameVal)

  $('#edit_form_name').on({
    click: function() {
      $(this).hide()
      $('#form_title').hide()
      $('#form_name_input').show()
      $('#form_name_check').show()
    }
  })

  //display the new input value on form title
  $('#form_name_check').on({
    click: function() {
      $('#form_title').text($('[name = form_name_input]').val())
      $(this).hide()
      $('#form_title').show()
      $('#form_name_input').hide()
      $('#edit_form_name').show()
    }
  })
})

function count(index, element) {
  if(index.includes(int)) {
    index++
    $(element).attr('id', element + index)
  } else {
    index = 0
    index++
    $(element).attr('id', element + index)
  }
}

// Create new form area
$(function() {
  let area = $('#area')
  let areaIndex = area.attr('id')
  
  $('#new_area').on({
    click: function() {
      count(areaIndex, area)
      $('#area_container').append("<div id='area' class='container d-flex'><h3 style='flex: 1;'>Área</h3><button id='new_field' class='btn btn-success'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-plus-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z'/></svg>Novo campo</button></div>")
    }
  })
})

// Create new field
$(function() {
  let field = 0
  $('#new_field').on({
    click: function() {
      $('#form_area_container').append("<label id='label_field'>Testando<input id='field_input' name='field_input'</label>")

    }
  })
})