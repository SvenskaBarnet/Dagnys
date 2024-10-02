using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Backend.Models;

namespace Backend.Data
{
    public static class SeedData
    {
        public static void SeedProducts(IServiceProvider serviceProvider)
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
                        Name = "Bagel",
                        Description = "A classic bagel, perfect for breakfast.",
                        Price = 1.49M
                    }
                );
                context.SaveChanges();
            }
        }

        public static async Task SeedUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<UserModel>>();

            if (userManager.Users.Any())
            {
                return; // DB has been seeded
            }

            var user = new UserModel
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, "Admin@123");

            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }
}