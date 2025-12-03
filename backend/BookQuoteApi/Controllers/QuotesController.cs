using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookQuoteApi.Data;
using BookQuoteApi.Models;

namespace BookQuoteApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quotes = await _context.Quotes
                .Where(q => q.UserId == userId)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return Ok(quotes);
        }

        // GET: api/quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quote = await _context.Quotes
                .FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);

            if (quote == null)
            {
                return NotFound(new { message = "Quote not found" });
            }

            return Ok(quote);
        }

        // POST: api/quotes
        [HttpPost]
        public async Task<ActionResult<Quote>> CreateQuote(CreateQuoteRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var quote = new Quote
            {
                Text = request.Text,
                Author = request.Author,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
        }

        // PUT: api/quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuote(int id, UpdateQuoteRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quote = await _context.Quotes
                .FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);

            if (quote == null)
            {
                return NotFound(new { message = "Quote not found" });
            }

            quote.Text = request.Text;
            quote.Author = request.Author;

            await _context.SaveChangesAsync();

            return Ok(quote);
        }

        // DELETE: api/quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quote = await _context.Quotes
                .FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);

            if (quote == null)
            {
                return NotFound(new { message = "Quote not found" });
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Quote deleted successfully" });
        }
    }

    public class CreateQuoteRequest
    {
        public string Text { get; set; } = string.Empty;
        public string? Author { get; set; }
    }

    public class UpdateQuoteRequest
    {
        public string Text { get; set; } = string.Empty;
        public string? Author { get; set; }
    }
}
