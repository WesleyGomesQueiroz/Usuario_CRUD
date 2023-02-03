using System;

namespace Usuario_CRUD.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
