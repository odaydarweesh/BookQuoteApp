# Delete old migrations and create new PostgreSQL-compatible ones

# Step 1: Delete Migrations folder
Remove-Item -Path "backend/BookQuoteApi/Migrations" -Recurse -Force -ErrorAction SilentlyContinue

# Step 2: Create new migration for PostgreSQL
Set-Location backend/BookQuoteApi
dotnet ef migrations add InitialCreatePostgreSQL

Write-Host "Migration created successfully!"
Write-Host "Now commit and push:"
Write-Host "  git add ."
Write-Host "  git commit -m 'Recreate migrations for PostgreSQL compatibility'"
Write-Host "  git push origin main"
