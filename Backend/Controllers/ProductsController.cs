using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/v1/products")]
public class ProductsController(DagnysContext _context) : ControllerBase
{
    // GET: api/v1/products
    [HttpGet]
    public async Task<JsonResult> List()
    {
        List<ProductModel> products = await _context.Products.ToListAsync();
        return new JsonResult(products) { StatusCode = 200 };
    }

    // GET: api/v1/products/{id}
    [HttpGet("{id}")]
    public async Task<JsonResult> Get(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return new JsonResult("Product not found") { StatusCode = 404 };
        }
        return new JsonResult(product) { StatusCode = 200 };
    }

    // POST: api/v1/products
    [HttpPost]
    public async Task<JsonResult> Create([FromBody] ProductModel product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return new JsonResult(product) { StatusCode = 201 };
    }

    // PUT: api/v1/products/{id}
    [HttpPut("{id}")]
    public async Task<JsonResult> Update(int id, [FromBody] ProductModel updatedProduct)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return new JsonResult("Product not found") { StatusCode = 404 };
        }

        product.Name = updatedProduct.Name;
        product.Description = updatedProduct.Description;
        product.Price = updatedProduct.Price;

        _context.Products.Update(product);
        await _context.SaveChangesAsync();

        return new JsonResult(product) { StatusCode = 200 };
    }

    // DELETE: api/v1/products/{id}
    [HttpDelete("{id}")]
    public async Task<JsonResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return new JsonResult("Product not found") { StatusCode = 404 };
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return new JsonResult("Product deleted") { StatusCode = 200 };
    }
}
