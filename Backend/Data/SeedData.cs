using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DagnysContext(
                serviceProvider.GetRequiredService<DbContextOptions<DagnysContext>>()))
            {
                // Look for any products.
                if (context.Products.Any())
                {
                    return;   // DB has been seeded
                }

                context.Products.AddRange(
                    new ProductModel
                    {
                        Name = "Sourdough Bread",
                        Description = "A loaf of freshly baked sourdough bread.",
                        Price = 4.99M
                    },
                    new ProductModel
                    {
                        Name = "Chocolate Croissant",
                        Description = "A flaky croissant filled with rich chocolate.",
                        Price = 2.99M
                    },
                    new ProductModel
                    {
                        Name = "Blueberry Muffin",
                        Description = "A muffin packed with fresh blueberries.",
                        Price = 1.99M
                    },
                    new ProductModel
                    {
                        Name = "Cinnamon Roll",
                        Description = "A sweet roll with cinnamon and icing.",
                        Price = 3.49M
                    },
                    new ProductModel
                    {
                        Name = "Bagel",
                        Description = "A classic bagel, perfect for breakfast.",
                        Price = 1.49M
                    }
                );
                context.SaveChanges();
            }
        }
    }
}