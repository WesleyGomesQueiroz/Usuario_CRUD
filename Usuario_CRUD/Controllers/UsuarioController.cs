using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Usuario_CRUD.Models;

namespace Usuario_CRUD.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public List<UsuarioModel> PegarUsuarios()
        {
            string query = @"select * from usuario";

            using (var conn = new SqlConnection("Server=DESKTOP-BRO5KSP; Database=Lab; User Id=sa; Password=anonimo;"))
            {
                conn.Open();

                return conn.Query<UsuarioModel>(query).ToList();
            }
        }

        [HttpPost]
        public int SalvarUsuario(UsuarioModel usuario)
        {
            var query = @"insert into usuario values
                          ( @nome,
                            @email,
                            @status,
                            GETDATE()
                           )

		                  SELECT SCOPE_IDENTITY()";

            using (var conn = new SqlConnection("Server=DESKTOP-BRO5KSP; Database=Lab; User Id=sa; Password=anonimo;"))
            {
                conn.Open();

                return conn.Query<int>(query,
                   new
                   {
                       nome = usuario.Nome,
                       email = usuario.Email,
                       status = usuario.Status
                   }).FirstOrDefault();
            }
        }

        [HttpPost]
        public void EditarUsuario(UsuarioModel usuario)
        {
            string query = @"update usuario set 
                             	nome = @Nome,
                             	email = @Email,
                             	status = @Status
                             where id = @Id";

            using (var conn = new SqlConnection("Server=DESKTOP-BRO5KSP; Database=Lab; User Id=sa; Password=anonimo;"))
            {
                conn.Open();

                conn.Query(query, new
                {
                    id = usuario.Id,
                    nome = usuario.Nome,
                    email = usuario.Email,
                    status = usuario.Status
                });
            }
        }
    }
}
