# E=Banking System

Online Bank

## Installation

1. Clone the code
2. Make sure you have the necessary environments instlaled in your system;

- [.NET 6](https://dotnet.microsoft.com/en-us/download),
- [Node 16](https://nodejs.org/en/download/)
- [Postgres Database](https://www.postgresql.org/download/)

3. Register to [SendGrid](https://sendgrid.com/) mail service
4. Open `appsettings.json` and update your email, password and mail service key in `SendGrid` section
   also update your database username and password in `ConnectionStrings/Development` section
   
5. Run `dotnet tool install --global dotnet-ef` then `dotnet ef database update`
6. Run `cd frontend/` then `yarn install` or `npm install` to install the front end dependencies
7. Run `cd ..`\
   then run the application by\
   `dotnet run` or `dotnet watch run` for development purposes

## Contributing

Developed by Sprints Team 12
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
