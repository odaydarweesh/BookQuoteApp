using System.Security.Cryptography;
using System.Text;

namespace BookQuoteApi
{
    public class TestPasswordHash
    {
        public static void Main(string[] args)
        {
            string password = "123456";
            string hash = HashPassword(password);
            Console.WriteLine($"Password: {password}");
            Console.WriteLine($"Hash: {hash}");
            
            // Test verification
            bool isValid = VerifyPassword("123456", hash);
            Console.WriteLine($"Verification test: {isValid}");
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private static bool VerifyPassword(string password, string hash)
        {
            string hashedPassword = HashPassword(password);
            return hashedPassword == hash;
        }
    }
}
