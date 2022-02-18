// FUNCTIONS
//return just numbers from string
function justNumbers(param) {
  let num = param.replace(/[^0-9]/g, '')
  return parseInt(num)
}

// set or/and count for new ID
function countId(idNumber) {
  if(idNumber) {
    idNumber++
  } else {
    idNumber = 1
  }
  return idNumber
}

// return the new setted ID
function newId(element) {
  if(!element) {
    var idNumber = 0
  } else {
    idNumber = justNumbers(element)
  }
  return countId(idNumber)
}


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

// CREATE-FORM PAGE
// display of form title options/buttons and it's edit input
$(function() {
  $('#form_name_input').hide()
  $('#form_name_check').hide()

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
      $(this).hide()
      $('#form_title').show()
      $('#form_name_input').hide()
      $('#edit_form_name').show()
      $('#form_title').text($('[name = form_name_input]').val())
    }
  })
})


// Create new form area
$('#new_area').on({
  click: function() {
    let areaContainer = document.getElementById('area_container')
    if(areaContainer === null) {
      $('#form_title_div').after(
        `<div id="area_container" class="container d-flex flex-column border shadow-lg p-4 gap-3" style="top: 50px;">
        </div>`)
    }
      
    let areaId = $('.area').last().attr('id')
    let id = newId(areaId)

    $('#area_container').append(
      `
      <div id="area${id}" class="container area d-flex">
        <div class='d-flex' style="flex: 1;">
          <input id="area_name_input${id}" name="area_name_input${id}" type="text" class="form-control" value="Nome da área" aria-label="Nome da área" aria-describedby="area_name" style= "display: none; width: fit-content; flex: 0 1 auto">
          <h3 id="area_name${id}"></h3>
          <button id="edit_area_name${id}" type="button" class="btn edit-area-name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.1 68.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
          <button id="area_name_check${id}" type="button" class="btn area-name-check btn-success" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 18">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
            </svg>
          </button>
        </div>
        <button id="new_field" type="button" class="btn new-field btn-success" style="height: 42px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
          Novo campo
        </button>
      `)
    .append(`<div id="form_area_container${id}" class="container d-flex flex-wrap gap-4">
    </div>`)

    var areaNameVal = $(`[name = area_name_input${id}]`).val()
    $(`#area_name${id}`).text(areaNameVal)
  }
  
})

// Create new field
$(document).on('click', '.new-field', function() {
  let parentId = $(this).parent().attr('id')
  let areaId = justNumbers(parentId)

  let lastFieldId = $(`#form_area_container${areaId} .label-field`).last().attr('id')
  let id = newId(lastFieldId)

  $(`#form_area_container${areaId}`).append(
    `<label id='label_field${id}' class="label-field">Testando
        <input id='field_input${id}' name='field_input${id}'>
      </label>`)
})

// display of area title and it's edit input
$(function() {

  $(document).on('click', '.edit-area-name', function() {
    let prevId = $(this).prev().attr('id')
    let id = justNumbers(prevId)

    $(this).hide()
    $(`#area_name${id}`).hide()
    $(`#area_name_check${id}`).show()
    $(`#area_name_input${id}`).show()
  })

  $(document).on('click', '.area-name-check', function() {
    let prevId = $(this).prev().attr('id')
    let id = justNumbers(prevId)
    $(this).hide()
    $(`#area_name${id}`).text($(`[name = area_name_input${id}]`).val())
    $(`#edit_area_name${id}`).show()
    $(`#area_name${id}`).show()
    $(`#area_name_input${id}`).hide()
  })
})