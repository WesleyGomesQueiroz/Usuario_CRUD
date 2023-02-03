carregar();

var usuario_id;

function carregar() {
    $('#tbResultado').DataTable().destroy();

    $.ajax({
        url: '/Usuario/PegarUsuarios',
        type: 'GET',
        success: function (response) {
            $('#listaUsuarios>tr').not('[value=""]').remove();

            for (var indice in response) {
                var tbody = document.querySelector('#listaUsuarios');

                var trow = `<tr>
                                <td>${response[indice].id}</td>
                                <td>${response[indice].nome}</td>
                                <td>${response[indice].email}</td>
                                <td>${response[indice].status == true ? 'Ativo' : 'Desativado'}</td>
                                <td>${response[indice].dataCadastro}</td>
                                <td><button type="button" class="btn btn-info" onClick="abreModalEditarUsuario(${JSON.stringify(response[indice]).replaceAll("\"", "\'")})"> Editar </button></td>
                            </tr>`

                tbody.innerHTML += trow;
            }

            $('#tbResultado').DataTable();
        }
    });

}

function abreModalNovoUsuario() {
    $('#nome_id').val(null)
    $('#email_id').val(null)
    document.getElementById("ativar_id").checked = false;

    $('.modal-novo-usuario').modal();
}

function salvarNovoUsuario() {
    $.ajax({
        url: '/Usuario/SalvarUsuario',
        data: {
            Nome: document.getElementById("nome_id").value,
            Email: document.getElementById("email_id").value,
            Status: document.getElementById("ativar_id").checked
        },
        type: 'POST',
        success: function (response) {
            if (response > 0) {
                $('.modal-novo-usuario').modal('hide');
                carregar();
            }
        }
    });
}

function abreModalEditarUsuario(obj) {
    this.usuario_id = obj.id;
    document.getElementById("editar_nome_id").value = obj.nome;
    document.getElementById("editar_email_id").value = obj.email;
    document.getElementById("editar_ativar_id").checked = obj.status;

    $('.modal-editar-usuario').modal();
}

function salvarEditarUsuario() {
    $.ajax({
        url: '/Usuario/EditarUsuario',
        data: {
            Id: this.usuario_id,
            Nome: document.getElementById("editar_nome_id").value,
            Email: document.getElementById("editar_email_id").value,
            Status: document.getElementById("editar_ativar_id").checked
        },
        type: 'POST',
        success: function (response) {
            $('.modal-editar-usuario').modal('hide');
            carregar();
        }
    });
}