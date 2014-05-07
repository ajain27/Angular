using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class Todo
    {
        [Key]
        public int TodoItemId { get; set; }
        public string Text { get; set; }
        public byte Priority { get; set; }
        public DateTime? DueDate { get; set; }
    }
}