using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace Backend.Models;
    public class ProductModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
    }
